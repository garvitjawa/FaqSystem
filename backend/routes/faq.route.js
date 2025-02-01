import express from "express";
import Faq from "../models/faq.model.js";
import translateText from "../utils/translate.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  try {
    const languages = ["hi", "fr", "es"];
    const translations = {};
    for (const lang of languages) {
      translations[lang] = {
        question: await translateText(question, lang),
        answer: await translateText(answer, lang),
      };
    }
    const newFaq = new Faq({ question, answer, translations });
    await newFaq.save();
    return res.status(200).json({ success: true, data: newFaq });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const delFaq = await Faq.findByIdAndDelete(id);
    if (!delFaq) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const faqs = await Faq.find({});
    return res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const faq = req.body;
  try {
    const updatedFaq = await Faq.findByIdAndUpdate(id, faq, { new: true });
    return res.status(200).json({ success: true, data: updatedFaq });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
