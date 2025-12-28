import express from "express";
import bcrypt from "bcrypt"; // ← add this
import { User } from "../models/user.js";

import { validateSignupData } from "../utils/validation.js";

export const authRouter = express.Router(); // ← use Router directly

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      // ← changed name to "token" (more common)
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    const safeUser = {
      _id: user._id,
      name: user.name,
      emailId: user.emailId,
      // add only needed fields
    };

    res.status(200).json({ message: "Login successful", user: safeUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { password, firstName, lastName, emailId } = req.body;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      emailId,
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

authRouter.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
});
