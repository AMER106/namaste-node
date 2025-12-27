import express from "express";
import { Router } from "express";
import { ConnectionRequest } from "../models/connectionRequest.js";
import { auth } from "../middlewares/auth.js";
import { User } from "../models/user.js";
import { connect } from "mongoose";
export const requestRouter = Router();
requestRouter.post("/send/:status/:toUserId", auth, async (req, res) => {
  try {
    const { status, toUserId } = req.params;
    const fromUserId = req.user._id;

    const allowedStatuses = ["interested", "ignore"];
    if (!allowedStatuses.includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const toUser = await User.findById(toUserId);
    if (!toUser) {
      return res.status(404).json({ message: "Target user not found" });
    }

    const existingRequest = await ConnectionRequest.findOne({
      $or: [
        { fromUserId, toUserId: toUserId },
        { fromUserId: toUserId, toUserId: fromUserId },
      ],
    });
    if (existingRequest) {
      return res.status(400).json({
        message: "Connection request already exists between these users",
      });
    }
    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId: toUserId,
      status,
    });
    const data = await connectionRequest.save();
    res.json({ message: "Connection request sent successfully", data });
  } catch (err) {
    console.error("ERROR:", err); // ← add this
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

requestRouter.post("/review/:status/:requestId", auth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status.toLowerCase())) {
      return res.status(400).json({ message: "Invalid status value" });
    }
    const validateRequest = await ConnectionRequest.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });
    if (!validateRequest) {
      return res
        .status(404)
        .json({ message: "No pending request found to review" });
    }
    validateRequest.status = status;
    const updateRequest = await validateRequest.save();
    res.json({
      message: "Connection request reviewed successfully",
      updateRequest,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
