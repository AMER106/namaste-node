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

//get fistName user
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

app.patch("/update", async (req, res) => {
  const id = req.body._id;
  const data = req.body;
  try {
    const result = await User.findOneAndUpdate({ _id: id }, data);
    res.send("user updates successfully");
  } catch (err) {
    res.status(500).send("Error updating user");
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
