import express from "express";
const app = express();
import { connectDB } from "./config/db.js";
import { User } from "./models/user.js";
import { validateSignupData } from "./utils/validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

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
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("invalid email or password");
    }
    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      throw new Error("invalid email or password");
    } else {
      const token = await jwt.sign({ _id: user._id }, "DEVSECRET");
      res.cookie("token", token);
      res.json({ message: "Login successful", user });
    }
    // res.send("login successful", user);
  } catch (err) {
    res.status(500).send(err.message);
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
app.get("/profile", async (req, res) => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
      return res.status(401).send("Unauthorized: No token provided");
    }
    // validate the token
    const decodedMessage = await jwt.verify(token, "DEVSECRET");
    const { _id } = decodedMessage;
    console.log(_id);
    const user = await User.findById({ _id });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
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
