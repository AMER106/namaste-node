import mongoose from "mongoose";
import env from "./env.js";
export const connectDB = async () => {
  try {
    await mongoose.connect(env.data.DB_URL);
  } catch (err) {
    throw err;
  }
};
