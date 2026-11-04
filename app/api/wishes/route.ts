import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { initialWishes, Wish } from "@/data/initialWishes";

const dataFilePath = path.join(process.cwd(), "data", "wishes.json");

function getWishes(): Wish[] {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileData = fs.readFileSync(dataFilePath, "utf-8");
      const parsed = JSON.parse(fileData);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Error reading wishes file:", err);
  }
  return initialWishes;
}

function saveWishes(wishes: Wish[]): void {
  try {
    const dir = path.dirname(dataFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(wishes, null, 2), "utf-8");
  } catch (err) {
    console.error("Error saving wishes file:", err);
  }
}

export async function GET() {
  const wishes = getWishes();
  return NextResponse.json({ wishes });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, relationship, message, blessingTag } = body;

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
      message: message.trim().slice(0, 500),
      blessingTag: (blessingTag || "Blessings & Love").trim().slice(0, 30),
      createdAt: new Date().toISOString(),
      likes: 1,
    };

    const currentWishes = getWishes();
    const updated = [newWish, ...currentWishes];
    saveWishes(updated);

    // Optional Google Sheet webhook integration if user configures GOOGLE_SHEET_WEBHOOK_URL
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp: newWish.createdAt,
            name: newWish.name,
            relationship: newWish.relationship,
            message: newWish.message,
            blessingTag: newWish.blessingTag,
          }),
        }).catch((webhookErr) => {
          console.warn("Google Sheet webhook delivery failed:", webhookErr);
        });
      } catch {
        // Non-blocking
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
    const { id } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const currentWishes = getWishes();
    let updatedWish: Wish | null = null;

    const updated = currentWishes.map((w) => {
      if (w.id === id) {
        updatedWish = { ...w, likes: (w.likes || 0) + 1 };
        return updatedWish;
      }
      return w;
    });

    if (!updatedWish) {
      return NextResponse.json({ error: "Wish not found" }, { status: 404 });
    }

    saveWishes(updated);
    return NextResponse.json({ wish: updatedWish, success: true });
  } catch (err) {
    console.error("Error updating wish:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
