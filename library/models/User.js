import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  books: { type: Array, required: true },
  sound: { type: Array, required: true },
  subtitle: { type: String, required: true },
  currentBook: { type: String, required: true },
  password: {type: String, required: true },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
