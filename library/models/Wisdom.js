import mongoose from "mongoose";

const { Schema } = mongoose;

const wisdomSchema = new Schema({
  owner: { type: String, required: false },
  question: { type: String, required: false },
  answer: { type: String, required: false },
  benefit: { type: String, required: false },
  category: { type: String, required: false },
  book: { type: String, required: false },
  right: { type: Number, required: false },
});

const Wisdom = mongoose.models.Wisdom || mongoose.model("Wisdom", wisdomSchema);

export default Wisdom;
