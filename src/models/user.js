import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: { type: String, trim: true },
  age: { type: Number, min: 0 },
  gender: { type: String },
});

export const User = mongoose.model("User", userSchema);
