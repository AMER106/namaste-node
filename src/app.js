import express from "express";
const app = express();
import { connectDB } from "./config/db.js";
import { User } from "./models/user.js";
import { validateSignupData } from "./utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { auth } from "./middlewares/auth.js";

app.use(cookieParser());
app.use(express.json());

app.post("/signup", async (req, res) => {
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
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ emailId });
    const isPasswordValid = await user.validatePassword(password);
    if (!user || !isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = await user.getJWT();
    res.cookie("Bearer", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
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
//get firstName user
app.get("/user", async (req, res) => {
  try {
    const firstName = req.body.firstName;
    console.log(firstName);
    const firstNames = await User.findOne({ firstName: firstName });
    console.log(firstNames);
    res.json(firstNames);
  } catch (err) {
    res.status(500).send("Error fetching user");
  }
});
//get all users from the db

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});
app.delete("/delete-user", async (req, res) => {
  try {
    const id = req.body._id;
    const result = await User.deleteOne({ _id: id });
    res.json(result);
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
});
app.get("/profile", auth, async (req, res) => {
  try {
    // req.user is already attached by the auth middleware
    const user = req.user;
    res.status(200).json(user); // better to use .json()
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});
app.get("/find", async (req, res) => {
  try {
    const id = req.body._id;
    console.log(id);
    const users = await User.findById({ _id: id });
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching user by ID");
  }
});
//update the user

app.patch("/update/:userId", async (req, res) => {
  const { userId } = req.params;
  const data = req.body;

  try {
    const { emailId: email } = req.body;
    //if user  is trying to update email id, we shoud throw an error
    if (email) {
      return res.status(400).json({ message: "Email ID cannot be updated" });
    }

    const result = await User.findOneAndUpdate({ _id: userId }, data, {
      new: true, // return updated document
      runValidators: true, // run schema validations
    });

    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "User updated successfully",
      user: result,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error updating user",
      error: err.message,
    });
  }
});
//update the user with email ID

app.patch("/update-email", async (req, res) => {
  try {
    const emailId = req.body.emailId;
    const data = req.body;
    const result = await User.findOneAndUpdate({ emailId: emailId }, data);
    res.send("user updated successfully", result);
  } catch (err) {
    User.find;
    res.send("Error updating user by email ID");
  }
});

connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3001, () => {
      console.log("server is runnning on port 3001");
    });
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
