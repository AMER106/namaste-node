import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { authRouter } from "./routers/authRouter.js"; // ← default import
import { userRouter } from "./routers/userRouter.js";

const app = express();

app.use(express.json());
app.use(cookieParser()); // ← add cookie-parser globally

app.use("/auth", authRouter);
app.use("/user", userRouter);

// connectDB should return a promise
connectDB()
  .then(() => {
    console.log("DB connected successfully");
    app.listen(3001, () => {
      console.log("Server is running on port 3001");
    });
  })
  .catch((err) => {
    console.error("DB connection failed", err);
  });
