import { create } from "zustand";

export const useFaqStore = create((set) => ({
  faqs: [],
  setFaqs: (faqs) => set({ faqs }),

  createFaq: async (newFaq) => {
    // Check if both question and answer are provided
    if (!newFaq.question || !newFaq.answer) {
      return { success: false, message: "Please fill in all fields" };
    }

    try {
      const res = await fetch("/api/faqs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFaq),
      });

      // Check if the response is successful
      if (!res.ok) {
        throw new Error(`Failed to create FAQ: ${res.statusText}`);
      }

      // Get the raw response text for debugging
      const rawResponse = await res.text();
      console.log("Response received:", rawResponse);

      // Try parsing the response as JSON
      const data = rawResponse ? JSON.parse(rawResponse) : {};

      if (data.success) {
        // If success, update the FAQ list
        set((state) => ({ faqs: [...state.faqs, data.data] }));
        return { success: true, message: "FAQ created successfully" };
      } else {
        // Return error message from the response
        return { success: false, message: data.message || "Unknown error" };
      }
    } catch (error) {
      // Log and return error message
      console.error("Error creating FAQ:", error);
      return {
        success: false,
        message: error.message || "Something went wrong",
      };
    }
  },

  fetchFaqs: async () => {
    try {
      const res = await fetch("/api/faqs");
      if (!res.ok) {
        throw new Error(`Failed to fetch FAQs: ${res.statusText}`);
      }

      const data = await res.json();
      set({ faqs: data.data });
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      // Handle error, e.g., set empty list or show error message
      set({ faqs: [] });
    }
  },

  deleteFaq: async (fid) => {
    try {
      const res = await fetch(`/api/faqs/${fid}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete FAQ: ${res.statusText}`);
      }

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        faqs: state.faqs.filter((faq) => faq._id !== fid),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error deleting FAQ:", error);
      return {
        success: false,
        message: error.message || "Something went wrong",
      };
    }
  },

  updateFaq: async (fid, updatedFaq) => {
    try {
      const res = await fetch(`/api/faqs/${fid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFaq),
      });

      if (!res.ok) {
        throw new Error(`Failed to update FAQ: ${res.statusText}`);
      }

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        faqs: state.faqs.map((faq) => (faq._id === fid ? data.data : faq)),
      }));

      return { success: true, message: data.message };
    } catch (error) {
      console.error("Error updating FAQ:", error);
      return {
        success: false,
        message: error.message || "Something went wrong",
      };
    }
  },
}));
