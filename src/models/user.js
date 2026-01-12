import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
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
    about: {
      type: String,
      maxlength: 500,
      trim: true,
    },
    skills: {
      type: [String],
    },
    photoURL: {
      type: String,
      default:
        "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg?t=st=1740779693~exp=1740783293~hmac=3ffc11733917c931bddeec957e8fa649e6a1590282b3210d816ccbf54dab2e94&w=900",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid URL :" + value);
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
      trim: true, // removes space
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email format");
        }
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
// Automatically remove sensitive fields when converting to JSON
userSchema.set("toJSON", {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v; // optional: remove version key
    // delete ret.anyOtherSensitiveField;
    return ret;
  },
});
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user._id.toString() }, "DEVSECRETKEY", {
    expiresIn: "7 days",
  });
  return token;
};
userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordVallid = await bcrypt.compare(password, passwordHash);
  return isPasswordVallid;
};
export const User = mongoose.model("User", userSchema);
