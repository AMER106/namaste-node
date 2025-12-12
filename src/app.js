import express from "express";
const app = express();
import { connectDB } from "./config/db.js";
import { User } from "./models/user.js";

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log(req.body);

  try {
    const newUser = new User(req.body);
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
