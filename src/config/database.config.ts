import databaseClient from "mongoose";

let collections: string[] = [];

export async function connect(stringConnectUrl: string): Promise<void> {
  try {
    await databaseClient.connect(stringConnectUrl);
    console.log("Connected to MongoDB");
    const db = databaseClient.connection.db;
    if (!db) {
      throw new Error("Database connection is not initialized.");
    }

    const cols = await db.listCollections().toArray();
    collections = cols.map((col) => col.name);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Hàm lấy danh sách collections
export function getAllCollections(): string[] {
  return collections;
}
