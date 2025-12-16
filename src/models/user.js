import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 25,
    validate(value) {
      if (value.length < 3 || value.length > 25) {
        throw new Error("First name must be between 3 and 25 characters");
      }
    },
  },
  lastName: {
    type: String,
    trim: true,
    minlength: 3,
    maxlength: 25,
    validate(value) {
      if (value.length < 3 || value.length > 25) {
        throw new Error("last name must be between 3 and 25 characters");
      }
    },
  },
  age: {
    type: Number,
    min: 18,
    validate(value) {
      if (value < 18) {
        throw new Error("Age must be atleast 18  years old");
      }
    },
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value.toLowerCase())) {
        throw new Error("Gender must be male, female or others");
      }
    },
  },
  emailId: {
    type: String,
    required: [true, "Email is required"],
    unique: true, // creates a unique index
    lowercase: true, // converts to lowercase
    trim: true, // removes spaces
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address"],
    minlength: [5, "Email is too short"],
    maxlength: [254, "Email is too long"],
  },
});

export const User = mongoose.model("User", userSchema);
