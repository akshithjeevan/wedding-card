const { MongoClient } = require("mongodb");
const dns = require("dns");
const fs = require("fs");
const path = require("path");

try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch (e) {
  // Ignore
}

// Read .env.local
let uri = process.env.MONGODB_URI;
if (!uri) {
  try {
    const envContent = fs.readFileSync(path.join(__dirname, "..", ".env.local"), "utf8");
    const match = envContent.match(/MONGODB_URI=(.+)/);
    if (match) {
      uri = match[1].trim();
    }
  } catch (e) {
    // Ignore
  }
}

async function createAndVerifyStickyNote() {
  console.log("==================================================");
  console.log("   CREATING STICKY NOTE & VERIFYING IN ATLAS");
  console.log("==================================================\n");

  const client = new MongoClient(uri, { serverSelectionTimeoutMS: 8000 });

  try {
    console.log("1. Connecting to MongoDB Atlas...");
    await client.connect();
    const db = client.db("wedding");
    const collection = db.collection("wishes");
    console.log("   [OK] Connected to Atlas database 'wedding'");

    // Check count before
    const countBefore = await collection.countDocuments();
    console.log(`2. Current total notes in Atlas before test: ${countBefore}`);

    // Create a realistic sample wedding note
    const newNote = {
      id: "wish-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6),
      name: "Suresh & Divya",
      relationship: "Friend of Groom",
      message: "Dearest Vishnuraj & Josly, may your journey together be blessed with endless happiness, prosperity, and love! Cannot wait to celebrate with you at Chiramel Auditorium!",
      blessingTag: "💖 Eternal Love",
      color: "rose",
      createdAt: new Date().toISOString(),
      likes: 1,
    };

    console.log("\n3. Inserting new sticky note into MongoDB Atlas:");
    console.log(`   - Name: ${newNote.name}`);
    console.log(`   - Connection: ${newNote.relationship}`);
    console.log(`   - Note Message: "${newNote.message}"`);
    console.log(`   - Blessing Tag: ${newNote.blessingTag}`);
    console.log(`   - Color: ${newNote.color}`);
    console.log(`   - Generated ID: ${newNote.id}`);

    const insertResult = await collection.insertOne({ ...newNote });
    console.log(`   [OK] Insert Acknowledged: ${insertResult.acknowledged} (InsertedId: ${insertResult.insertedId})`);

    // Also update local backup file
    const wishesPath = path.join(__dirname, "..", "data", "wishes.json");
    try {
      const localWishes = JSON.parse(fs.readFileSync(wishesPath, "utf8"));
      fs.writeFileSync(wishesPath, JSON.stringify([newNote, ...localWishes], null, 2), "utf8");
      console.log("   [OK] Local backup file (data/wishes.json) updated");
    } catch (localErr) {
      console.warn("   [WARN] Local backup sync skipped:", localErr.message);
    }

    // Now query Atlas directly to prove the data is stored in the database
    console.log("\n4. Querying MongoDB Atlas to verify the inserted record...");
    const verifiedDoc = await collection.findOne({ id: newNote.id });

    if (verifiedDoc) {
      console.log("   [SUCCESS] Document confirmed in MongoDB Atlas!");
      console.log("   ---------------------------------------------");
      console.log("   _id:          ", verifiedDoc._id.toString());
      console.log("   id:           ", verifiedDoc.id);
      console.log("   name:         ", verifiedDoc.name);
      console.log("   relationship: ", verifiedDoc.relationship);
      console.log("   message:      ", verifiedDoc.message);
      console.log("   blessingTag:  ", verifiedDoc.blessingTag);
      console.log("   color:        ", verifiedDoc.color);
      console.log("   likes:        ", verifiedDoc.likes);
      console.log("   createdAt:    ", verifiedDoc.createdAt);
      console.log("   ---------------------------------------------");
    } else {
      console.error("   [ERROR] Document could not be found in Atlas!");
      process.exit(1);
    }

    const countAfter = await collection.countDocuments();
    console.log(`\n5. Final document count in Atlas: ${countAfter} (increased by ${countAfter - countBefore})`);
    console.log("\n==================================================");
    console.log("   VERIFICATION COMPLETE: DATA IS 100% IN ATLAS");
    console.log("==================================================");
  } catch (err) {
    console.error("FATAL ERROR during test:", err);
    process.exit(1);
  } finally {
    await client.close();
  }
}

createAndVerifyStickyNote();

