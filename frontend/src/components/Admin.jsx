import { useFaqStore } from "@/store/faq";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Admin = () => {
  const { faqs, fetchFaqs, deleteFaq } = useFaqStore();

  useEffect(() => {
    fetchFaqs();
  }, [fetchFaqs]);

  const handleDelete = async (id) => {
    const res = await deleteFaq(id);
    if (res.success) {
      alert(res.message);
    } else {
      alert("Failed to delete FAQ");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>Manage FAQs</h1>
        <Link to="/admin/create" style={styles.createButton}>
          Create New FAQ
        </Link>
      </div>

      <div style={styles.faqList}>
        {faqs.map((faq) => (
          <div key={faq._id} style={styles.faqCard}>
            <h2 style={styles.question}>{faq.question}</h2>
            <p style={styles.answer}>{faq.answer}</p>
            <div style={styles.actions}>
              <Link to={`/admin/update/${faq._id}`} style={styles.editButton}>
                Edit
              </Link>
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(faq._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;

// Inline styles
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  createButton: {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "16px",
  },
  faqList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  faqCard: {
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  question: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  answer: {
    fontSize: "16px",
    color: "#555",
    marginBottom: "15px",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  editButton: {
    backgroundColor: "#28a745",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    textDecoration: "none",
    fontSize: "14px",
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    color: "#fff",
    padding: "8px 16px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
  },
};
