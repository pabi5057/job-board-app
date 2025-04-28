import mongoose from "mongoose";

const MONGODB_URI = "mongodb://localhost:27017/job-board-db";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose || { conn: null, promise: null };

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  global.mongoose = cached;
  return cached.conn;
}
