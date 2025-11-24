import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

export async function connectDB(): Promise<typeof mongoose> {
  try {

    const conn = await mongoose.connect(MONGODB_URI!);
    console.log("✅ MongoDB connecté avec succès");
    console.log("MongoDB readyState:", mongoose.connection.readyState); 
    return conn;
  } catch (error) {
    console.error("❌ Erreur de connexion MongoDB :", error);
    throw error;
  }
}
