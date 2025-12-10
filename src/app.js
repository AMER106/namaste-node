import express from "express";
const app = express();
import { auth, user } from "./middlewares/auth.js";

app.use("/admin", auth, (req, res) => {
  res.send("Welcome to admin panel");
});
app.use("/user/profile", user, (req, res) => {
  res.send("Welcome to user profile");
});
app.use("/user/login", (req, res) => {
  res.send("User login page");
});

app.listen(3001, () => {
  console.log("server is runnning on port 3001");
});
