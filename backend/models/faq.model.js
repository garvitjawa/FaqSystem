import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    translations: {
      question_hi: { type: String },
      question_fr: { type: String },
      question_en: { type: String },
      answer_hi: { type: String },
      answer_fr: { type: String },
      answer_en: { type: String },
    },
  },
  { timestamps: true }
);
const Faq = mongoose.model("Faq", faqSchema);
export default Faq;
