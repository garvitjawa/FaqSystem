import React, { useState } from "react";
import { useFaqStore } from "@/store/faq";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateFaq = () => {
  const { createFaq } = useFaqStore();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    const newFaq = { question, answer };
    const res = await createFaq(newFaq);

    if (res.success) {
      alert("FAQ Created!");
      navigate("/admin");
    } else {
      alert("Error creating FAQ.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Create FAQ</h1>
      <form onSubmit={handleCreate}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="question"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Question
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter your question here"
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="answer"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Answer
          </label>
          <ReactQuill
            value={answer}
            onChange={setAnswer}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              minHeight: "150px",
            }}
            placeholder="Enter your answer here"
            required
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#4CAF50",
            color: "white",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Create FAQ
        </button>
      </form>
    </div>
  );
};

export default CreateFaq;
