import express from "express";
import session from "express-session";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import userRoute from "./routes/userRoutes.js";
import setupSocket from "./socket.js";
import "./config/auth.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { createServer } from "http";

const app = express();
const http = createServer(app);

dotenv.config();
const port = process.env.PORT || 8000;

const corsOptions = {
  origin: "*",
  Credential: true,
  methods: ["GET", "POST", "DELETE"],
};

setupSocket(http);
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoute);

mongoose.set("strictQuery", false);

// database connection method
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database Connect Succesfully");
  } catch (error) {
    console.log("Database failed to connect" + error);
  }
};

http.listen(port, () => {
  connectDB();
  console.log("app is running on port", port);
});
