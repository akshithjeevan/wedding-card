import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { initialWishes, Wish } from "@/data/initialWishes";
import { getMongoClient } from "@/lib/mongodb";

const dataFilePath = path.join(process.cwd(), "data", "wishes.json");

function getLocalWishes(): Wish[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf-8");
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading local wishes file:", err);
  }
  return initialWishes;
}

function saveLocalWishes(wishes: Wish[]): void {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(wishes, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving local wishes file:", err);
  }
}

export const dynamic = "force-dynamic";

export async function GET() {
  const clientPromise = getMongoClient();

  if (clientPromise) {
    try {
      const client = await clientPromise;
      const db = client.db("wedding");
      const collection = db.collection<Wish>("wishes");

      const count = await collection.countDocuments();
      if (count === 0) {
        // Seed MongoDB Atlas with initial wishes
        await collection.insertMany(initialWishes as Wish[]);
        return NextResponse.json({ wishes: initialWishes });
      }

      const wishes = await collection
        .find({}, { projection: { _id: 0 } })
        .sort({ createdAt: -1 })
        .toArray();

      return NextResponse.json({ wishes });
    } catch (err) {
      console.warn("MongoDB Atlas fetch failed, using local fallback:", err);
    }
  }

  // Local fallback
  const wishes = getLocalWishes();
  return NextResponse.json({ wishes });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, relationship, message, blessingTag, color } = body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const newWish: Wish = {
      id: "wish-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
      name: name.trim().slice(0, 80),
      relationship: (relationship || "Well Wisher").trim().slice(0, 50),
      message: message.trim().slice(0, 200),
      blessingTag: (blessingTag || "Blessings & Love").trim().slice(0, 30),
      color: typeof color === "string" ? color : "yellow",
      createdAt: new Date().toISOString(),
      likes: 1,
    };

    // Always update local backup
    const localWishes = getLocalWishes();
    saveLocalWishes([newWish, ...localWishes]);

    // Save to MongoDB Atlas if available
    const clientPromise = getMongoClient();
    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db("wedding");
        await db.collection("wishes").insertOne({ ...newWish });
      } catch (mongoErr) {
        console.warn("MongoDB Atlas insert failed, saved to local fallback:", mongoErr);
      }
    }

    return NextResponse.json({ wish: newWish, success: true }, { status: 201 });
  } catch (err) {
    console.error("Error creating wish:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, action } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const delta = action === "unlike" ? -1 : 1;

    // Try MongoDB Atlas update first
    const clientPromise = getMongoClient();
    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db("wedding");
        const collection = db.collection<Wish>("wishes");

        const updated = await collection.findOneAndUpdate(
          { id },
          { $inc: { likes: delta } },
          { returnDocument: "after", projection: { _id: 0 } }
        );

        if (updated) {
          // Keep local fallback in sync with MongoDB
          try {
            const currentWishes = getLocalWishes();
            const synced = currentWishes.map((w) => (w.id === id ? updated : w));
            saveLocalWishes(synced);
          } catch {
            // Ignore
          }
          return NextResponse.json({ wish: updated, success: true });
        }
      } catch (mongoErr) {
        console.warn("MongoDB Atlas update failed, using local fallback:", mongoErr);
      }
    }

    // Local fallback update
    const currentWishes = getLocalWishes();
    let updatedWish: Wish | null = null;

    const updated = currentWishes.map((w) => {
      if (w.id === id) {
        updatedWish = { ...w, likes: Math.max(0, (w.likes || 0) + delta) };
        return updatedWish;
      }
      return w;
    });

    if (!updatedWish) {
      return NextResponse.json({ error: "Wish not found" }, { status: 404 });
    }

    saveLocalWishes(updated);
    return NextResponse.json({ wish: updatedWish, success: true });
  } catch (err) {
    console.error("Error updating wish:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // Delete from MongoDB Atlas
    const clientPromise = getMongoClient();
    if (clientPromise) {
      try {
        const client = await clientPromise;
        const db = client.db("wedding");
        await db.collection("wishes").deleteOne({ id });
      } catch (mongoErr) {
        console.warn("MongoDB Atlas delete failed:", mongoErr);
      }
    }

    // Delete from local backup
    const currentWishes = getLocalWishes();
    const filtered = currentWishes.filter((w) => w.id !== id);
    saveLocalWishes(filtered);

    return NextResponse.json({ success: true, id });
  } catch (err) {
    console.error("Error deleting wish:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
