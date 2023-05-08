import mongoose from "mongoose";

const { Schema } = mongoose;

const wisdomSchema = new Schema({
  owner: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  category: { type: String, required: true },
  book: { type: String, required: true },
  right: { type: String, required: true },
});

const Wisdom = mongoose.models.Wisdom || mongoose.model("Wisdom", wisdomSchema);

export default Wisdom;
