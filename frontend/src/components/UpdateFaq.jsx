import React, { useEffect, useState } from "react";
import { useFaqStore } from "@/store/faq";
import { useParams, useNavigate } from "react-router-dom";
import TextEditor from "./TextEditor";

const UpdateFaq = () => {
  const { faqs, updateFaq, fetchFaqs } = useFaqStore();
  const { id } = useParams();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  useEffect(() => {
    const faqToUpdate = faqs.find((faq) => faq._id === id);
    if (faqToUpdate) {
      setQuestion(faqToUpdate.question);
      setAnswer(faqToUpdate.answer);
    }
  }, [faqs, id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedFaq = { question, answer };
    const res = await updateFaq(id, updatedFaq);
    if (res.success) {
      navigate("/admin"); // ✅ Corrected
    } else {
      alert("Failed to update FAQ");
    }
  };

  return (
    <div>
      <h1>Update FAQ</h1>
      <form onSubmit={handleUpdate}>
        <div>
          <label>Question</label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Answer</label>
          <TextEditor
            value={answer}
            onChange={(newAnswer) => setAnswer(newAnswer)}
          />
        </div>
        <button type="submit">Update FAQ</button>
      </form>
    </div>
  );
};

export default UpdateFaq;
