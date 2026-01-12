import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import { authRouter } from "./routers/authRouter.js"; // ← default import
import { profileRouter } from "./routers/profileRouter.js";
import { requestRouter } from "./routers/requestRouter.js";
import cors from "cors";
import { userRouter } from "./routers/userRouter.js";
const app = express();

app.use(express.json());
app.use(cookieParser()); // ← add cookie-parser globally
const corsOptions = {
  origin: "http://localhost:5173", // Specify allowed origins

  credentials: true, // Allow cookies to be sent
};

app.use(cors(corsOptions));
app.use("/auth", authRouter);
app.use("/user", profileRouter);
app.use("/request", requestRouter);
app.use("/connections", userRouter);

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
