import express from "express";
import { Router } from "express";
import { User } from "../models/user.js";
import { auth } from "../middlewares/auth.js";
export const userRouter = Router();

userRouter.get("/user", async (req, res) => {
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

userRouter.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});
userRouter.delete("/delete-user", async (req, res) => {
  try {
    const id = req.body._id;
    const result = await User.deleteOne({ _id: id });
    res.json(result);
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
});
userRouter.get("/profile", auth, async (req, res) => {
  try {
    // req.user is already attached by the auth middleware
    const user = req.user;
    res.status(200).json(user); // better to use .json()
  } catch (err) {
    res.status(500).json({ message: err.message || "Server error" });
  }
});
userRouter.get("/find", async (req, res) => {
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

userRouter.patch("/update/:userId", async (req, res) => {
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

userRouter.patch("/update-email", async (req, res) => {
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
