import express from "express";
import { auth } from "../middlewares/auth";
import { ConnectionRequest } from "../models/connectionRequest";
export const userRouter = express.Router();

userRouter.get("/user/requests/received", auth, async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const requests = await ConnectionRequest.find({
      toUserId: loggedInUserId,
      status: "interested",
    }).populate("fromUserId", "firstName lastName emailId");
    return res.status(200).json({
      message: "Connection requests fetched successfully",
      data: requests,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Server error", error: err.message });
  }
});
