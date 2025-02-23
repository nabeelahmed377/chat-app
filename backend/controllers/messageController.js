import Message from "../models/Message.js";
import mongoose from "mongoose";

export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const senderObjectId = new mongoose.Types.ObjectId(senderId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    const messages = await Message.find({
      $or: [
        { userId: senderObjectId, receiverId: receiverObjectId },
        { userId: receiverObjectId, receiverId: senderObjectId },
      ],
    })
      .sort({ timestamp: -1 })
      .limit(50)
      .lean();

    res.status(200).json(messages.reverse());
  } catch (error) {
    console.error(" Error fetching messages:", error);
    res.status(500).json({ error: error.message });
  }
};

export const addMessage = async (req, res) => {
  try {
    const { text, user, userId, receiverId } = req.body;

    if (!text || !user || !userId || !receiverId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const senderObjectId = new mongoose.Types.ObjectId(userId);
    const receiverObjectId = new mongoose.Types.ObjectId(receiverId);

    const message = new Message({
      text,
      user,
      userId: senderObjectId,
      receiverId: receiverObjectId,
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({ error: error.message });
  }
};

export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await Message.findByIdAndDelete(id);
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: error.message });
  }
};
