import { Server } from "socket.io";
import Message from "./models/Message.js";
import mongoose from "mongoose";

const setupSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    socket.on("sendMessage", async (data) => {
      try {
        // 🔥 Ensure all required fields exist
        if (!data.text || !data.user || !data.userId || !data.receiverId) {
          console.error("Missing Fields:", data);
          return;
        }

        const senderObjectId = new mongoose.Types.ObjectId(data.userId);
        const receiverObjectId = new mongoose.Types.ObjectId(data.receiverId);

        const newMessage = new Message({
          text: data.text,
          user: data.user,
          userId: senderObjectId,
          receiverId: receiverObjectId,
        });

        await newMessage.save();

        io.emit("message", newMessage);
      } catch (error) {
        console.error("Error saving message:", error);
      }
    });

    socket.on("deleteMessage", async (id) => {
      try {
        const deletedMessage = await Message.findByIdAndDelete(id);
        if (deletedMessage) {
          console.log(" Message deleted successfully:", deletedMessage);
          io.emit("deleteMessage", id);
        } else {
          console.log("No message found with this ID:", id);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    });
  });
};

// module.exports = setupSocket;

export default setupSocket;
