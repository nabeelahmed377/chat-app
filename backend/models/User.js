import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  googleId: String,
  name: String,
  email: { type: String, unique: true },
  image: String,
});

export default mongoose.model("User", UserSchema);
