import { MongoClient } from "mongodb";
import dns from "dns";
import fs from "fs";
import path from "path";

// Use resilient public DNS servers for MongoDB Atlas SRV lookup on Node.js / Windows
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {
  // Ignore
}

const options = {};

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;
let lastUri = "";

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

function getMongoUri(): string | undefined {
  if (process.env.MONGODB_URI) {
    return process.env.MONGODB_URI;
  }
  try {
    const envPath = path.join(process.cwd(), ".env.local");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/MONGODB_URI=(.+)/);
      if (match) {
        return match[1].trim();
      }
    }
  } catch {
    // Ignore
  }
  return undefined;
}

export function getMongoClient(): Promise<MongoClient> | null {
  const uri = getMongoUri();
  if (!uri) {
    return null;
  }

  // If URI changed or previous attempt failed, reset client
  if (uri !== lastUri) {
    lastUri = uri;
    global._mongoClientPromise = undefined;
    clientPromise = null;
    client = null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      try {
        client = new MongoClient(uri, options);
        global._mongoClientPromise = client.connect().catch((err) => {
          global._mongoClientPromise = undefined;
          client = null;
          throw err;
        });
      } catch (err) {
        global._mongoClientPromise = undefined;
        client = null;
        return null;
      }
    }
    return global._mongoClientPromise;
  } else {
    if (!clientPromise) {
      try {
        client = new MongoClient(uri, options);
        clientPromise = client.connect().catch((err) => {
          clientPromise = null;
          client = null;
          throw err;
        });
      } catch (err) {
        clientPromise = null;
        client = null;
        return null;
      }
    }
    return clientPromise;
  }
}

export default getMongoClient;
