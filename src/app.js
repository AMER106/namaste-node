import express from "express";
const app = express();
import { connectDB } from "./config/db.js";

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
