import dotenv from "dotenv";
import express from "express";
import faqRoutes from "./routes/faq.route.js";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json());

const port = process.env.PORT;

app.use("/api/faq", faqRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Example app listening on port ${port}`);
});
