import databaseClient from "mongoose";

let collections: string[] = [];

export async function connect(stringConnectUrl: string): Promise<void> {
  try {
    await databaseClient.connect(stringConnectUrl);
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Hàm lấy danh sách collections