import express from "express";
import {
  getMessages,
  addMessage,
  deleteMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/:senderId/:receiverId", getMessages);

router.post("/", addMessage);

router.delete("/delete/:id", deleteMessage);

export default router;
