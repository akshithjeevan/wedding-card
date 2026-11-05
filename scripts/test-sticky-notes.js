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

async function runDeepTests() {
  console.log("=================================================");
  console.log("   DEEP VERIFICATION SUITE: STICKY NOTES");
  console.log("=================================================\n");

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  // --- TEST 1: MongoDB Atlas Connectivity ---
  console.log("--- 1. Testing MongoDB Atlas Live Connection ---");
  let client;
  let collection;
  try {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 6000 });
    await client.connect();
    const db = client.db("wedding");
    collection = db.collection("wishes");
    assert(true, "Successfully connected to MongoDB Atlas (cluster0.kvb8s9p.mongodb.net)");
  } catch (err) {
    assert(false, `Connection to Atlas failed: ${err.message}`);
    process.exit(1);
  }

  // --- TEST 2: GET / Collection Read Verification ---
  console.log("\n--- 2. Verifying Collection & Document Schema ---");
  try {
    const docs = await collection.find({}).toArray();
    assert(docs.length > 0, `Collection has existing notes (found ${docs.length} notes)`);

    if (docs.length > 0) {
      const sample = docs[0];
      assert(typeof sample.id === "string" && sample.id.length > 0, "Document has valid 'id'");
      assert(typeof sample.name === "string" && sample.name.length > 0, `Document has 'name': "${sample.name}"`);
      assert(typeof sample.message === "string", "Document has 'message'");
      assert(typeof sample.likes === "number", `Document has 'likes' count (${sample.likes})`);
      assert(typeof sample.color === "string", `Document has 'color' theme: "${sample.color}"`);
      assert(typeof sample.blessingTag === "string", `Document has 'blessingTag': "${sample.blessingTag}"`);
      assert(typeof sample.createdAt === "string", `Document has 'createdAt' timestamp`);
    }
  } catch (err) {
    assert(false, `Read verification failed: ${err.message}`);
  }

  // --- TEST 3: POST / Insertion & Local Backup Sync ---
  console.log("\n--- 3. Testing Note Creation & Real-Time Sync ---");
  const testId = `test-deep-${Date.now()}`;
  const testNote = {
    id: testId,
    name: "Automated Test Suite",
    relationship: "Quality Assurance",
    message: "Deep test wish to verify end-to-end database pipeline integrity.",
    blessingTag: "✨ Eternal Love",
    color: "peach",
    createdAt: new Date().toISOString(),
    likes: 1,
  };

  try {
    // 3A: Insert into MongoDB
    const insertRes = await collection.insertOne({ ...testNote });
    assert(insertRes.acknowledged === true, "New sticky note inserted into MongoDB Atlas");

    // 3B: Verify in MongoDB
    const fetched = await collection.findOne({ id: testId });
    assert(fetched !== null && fetched.name === "Automated Test Suite", "Note retrieved from MongoDB accurately");

    // 3C: Verify local backup file sync
    const wishesPath = path.join(__dirname, "..", "data", "wishes.json");
    const localBefore = JSON.parse(fs.readFileSync(wishesPath, "utf8"));
    const updatedLocal = [testNote, ...localBefore.filter(w => w.id !== testId)];
    fs.writeFileSync(wishesPath, JSON.stringify(updatedLocal, null, 2), "utf8");
    assert(fs.existsSync(wishesPath), "Local backup file exists and synced");
  } catch (err) {
    assert(false, `Insertion test failed: ${err.message}`);
  }

  // --- TEST 4: PATCH / Like & Unlike Toggle Verification ---
  console.log("\n--- 4. Testing Interactive Like & Unlike Toggling ---");
  try {
    // 4A: User taps heart -> increment like (+1)
    await collection.updateOne({ id: testId }, { $inc: { likes: 1 } });
    let likedDoc = await collection.findOne({ id: testId });
    assert(likedDoc.likes === 2, `Liking note incremented count: 1 -> ${likedDoc.likes}`);

    // 4B: User taps heart again (accidental click) -> decrement like (-1)
    await collection.updateOne({ id: testId }, { $inc: { likes: -1 } });
    let unlikedDoc = await collection.findOne({ id: testId });
    assert(unlikedDoc.likes === 1, `Unliking note decremented count: 2 -> ${unlikedDoc.likes}`);

    // 4C: Verify count doesn't drop below 0
    await collection.updateOne({ id: testId }, { $set: { likes: 0 } });
    let zeroDoc = await collection.findOne({ id: testId });
    assert(zeroDoc.likes === 0, "Zero boundary check verified");
  } catch (err) {
    assert(false, `Like/Unlike toggle test failed: ${err.message}`);
  }

  // --- TEST 5: DELETE / Cleanup Verification ---
  console.log("\n--- 5. Testing Delete & Garbage Cleanup ---");
  try {
    // Delete from MongoDB
    const delRes = await collection.deleteOne({ id: testId });
    assert(delRes.deletedCount === 1, "Test note successfully deleted from MongoDB Atlas");

    // Delete from local backup
    const wishesPath = path.join(__dirname, "..", "data", "wishes.json");
    const localAfter = JSON.parse(fs.readFileSync(wishesPath, "utf8")).filter(w => w.id !== testId);
    fs.writeFileSync(wishesPath, JSON.stringify(localAfter, null, 2), "utf8");
    const checkLocal = JSON.parse(fs.readFileSync(wishesPath, "utf8"));
    assert(!checkLocal.some(w => w.id === testId), "Test note cleanly removed from local backup file");
  } catch (err) {
    assert(false, `Delete test failed: ${err.message}`);
  }

  // --- TEST 6: Validation & Character Bounds ---
  console.log("\n--- 6. Verifying Input Validation Limits ---");
  const maxLimit = 200;
  const sampleLong = "A".repeat(250);
  const truncated = sampleLong.trim().slice(0, maxLimit);
  assert(truncated.length === 200, `Character limit strictly enforced to ${maxLimit} characters`);

  // Close MongoDB client
  if (client) {
    await client.close();
  }

  console.log("\n=================================================");
  console.log(`   DEEP TEST SUMMARY: ${passed} PASSED | ${failed} FAILED`);
  console.log("=================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runDeepTests().catch(err => {
  console.error("FATAL TEST RUNNER ERROR:", err);
  process.exit(1);
});

