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
    console.error("Could not read .env.local:", e.message);
  }
}

if (!uri) {
  console.error("No MONGODB_URI found!");
  process.exit(1);
}

console.log("Connecting to MongoDB Atlas...");

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected successfully to MongoDB Atlas!");

    const db = client.db("wedding");
    const collection = db.collection("wishes");

    const wishesPath = path.join(__dirname, "..", "data", "wishes.json");
    const wishes = JSON.parse(fs.readFileSync(wishesPath, "utf8"));

    console.log(`Syncing ${wishes.length} wishes into wedding.wishes collection...`);

    for (const wish of wishes) {
      await collection.updateOne(
        { id: wish.id },
        { $set: wish },
        { upsert: true }
      );
    }

    const count = await collection.countDocuments();
    console.log(`Done! Total documents in wedding.wishes: ${count}`);
  } catch (err) {
    console.error("Error during MongoDB sync:", err);
  } finally {
    await client.close();
  }
}

run();

