import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

MessageSchema.index({ userId: 1, receiverId: 1, timestamp: 1 });

export default mongoose.model("Message", MessageSchema);
