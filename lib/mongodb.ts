import * as mongoose from "mongoose";

const uri = process.env.MONGO_URI;

export async function connectToDatabase() {
  try {
    await mongoose.connect(`${uri}`);
    console.log("====================================");
    console.log("Berhasil terhubung ke database");
    console.log("====================================");
  } catch (error) {
    console.error("====================================");
    console.error("Gagal terhubung ke database");
    console.error(error);
    console.error("====================================");
    throw error;
  }
}
