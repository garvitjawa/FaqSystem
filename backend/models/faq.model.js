import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
      type: Map,
      of: {
        question: String,
        answer: String,
      },
    },
  },
  { timestamps: true }
);
const Faq = mongoose.model("Faq", faqSchema);
export default Faq;
