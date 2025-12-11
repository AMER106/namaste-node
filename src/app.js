import express from "express";
const app = express();
import { connectDB } from "./config/db.js";
import { User } from "./models/user.js";

app.post("/signup", async (req, res) => {
  const newUser = new User({
    firstName: "mustafa",
    lastName: "mohd",
    age: 26,
    gender: "male",
  });
  try {
    await newUser.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Error creating user");
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
