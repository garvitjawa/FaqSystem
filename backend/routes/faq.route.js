import express from "express";
import Faq from "../models/faq.model.js";
import translateText from "../utils/translate.js";
import NodeCache from "node-cache";
import mongoose from "mongoose";

const router = express.Router();
const cache = new NodeCache({ stdTTL: 600 });

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

    try {
      cache.set(`faq_${newFaq._id}`, newFaq, 3600);
    } catch (cacheError) {
      console.error("Cache set error:", cacheError);
    }

    try {
      cache.del("faqs");
    } catch (cacheError) {
      console.error("Cache delete error:", cacheError);
    }

    return res.status(200).json({ success: true, data: newFaq });
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const delFaq = await Faq.findByIdAndDelete(id);
    if (!delFaq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    cache.del(`faq_${id}`);
    cache.del("faqs");

    return res
      .status(200)
      .json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/", async (req, res) => {
  const cacheKey = "faqs";

  try {
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      console.log("Data retrieved from cache");
      return res.status(200).json({ success: true, data: cachedData });
    }

    console.log("Data not found in cache, fetching from database...");
    const faqs = await Faq.find({}).lean();

    cache.set(cacheKey, faqs, 3600);
    console.log("Data stored in cache");

    return res.status(200).json({ success: true, data: faqs });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const faq = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid FAQ ID" });
    }

    const languages = ["hi", "fr", "es"];
    const translations = {};
    for (const lang of languages) {
      translations[lang] = {
        question: await translateText(faq.question, lang),
        answer: await translateText(faq.answer, lang),
      };
    }

    const updatedFaq = await Faq.findByIdAndUpdate(
      id,
      { ...faq, translations },
      { new: true }
    ).lean();

    if (!updatedFaq) {
      return res.status(404).json({ success: false, message: "FAQ not found" });
    }

    cache.del(`faq_${id}`);
    cache.del("faqs");

    cache.set(`faq_${id}`, updatedFaq, 3600);
    console.log(`Cache updated for FAQ with ID: ${id}`);

    return res.status(200).json({ success: true, data: updatedFaq });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
