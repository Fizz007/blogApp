import React, { useEffect, useState } from "react";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import { client } from "../../client";

export default function CommentSection({ postId, userId }) {
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [feedbackDocId, setFeedbackDocId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ Fetch existing feedback for this user/post
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const query = `*[_type == "feedback" && post._ref == $postId && userId == $userId][0]`;
        const params = { postId, userId };
        const existing = await client.fetch(query, params);
        if (existing) {
          setFeedback(existing.feedback);
          setFeedbackDocId(existing._id);
        }
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };
    fetchFeedback();
  }, [postId, userId]);

  const handleFeedback = async (type) => {
    const newFeedback = feedback === type ? null : type; 
    setFeedback(newFeedback);

    try {
      if (feedbackDocId) {
        await client.patch(feedbackDocId).set({ feedback: newFeedback }).commit();
      } else if (newFeedback) {
        const doc = await client.create({
          _type: "feedback",
          post: { _type: "reference", _ref: postId },
          userId,
          feedback: newFeedback,
          createdAt: new Date().toISOString(),
        });
        setFeedbackDocId(doc._id);
      }
    } catch (err) {
      console.error("Feedback error:", err);
    }
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      const text = value.trim();
      if (!text) return;

      setIsSubmitting(true);
      try {
        await client.create({
          _type: "comment",
          text,
          post: { _type: "reference", _ref: postId },
          createdAt: new Date().toISOString(),
        });
        setValue("");
        alert("✅ Comment submitted!");
      } catch (err) {
        console.error("Error saving comment:", err);
        alert("❌ Failed to save comment");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section className="pt-[32px] pb-[16px]">
      <h4 className="font-medium text-[#151515] mb-2">
        Did you find this useful? Leave a comment
      </h4>

      <h4 className="font-semibold text-[#737373] pb-[12px]">Comment</h4>

      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows="5"
        placeholder="Press Enter to submit your comment..."
        className="w-full border border-[#D9D9D9] p-2 rounded-md placeholder:text-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
        disabled={isSubmitting}
      />

      <h4 className="font-semibold text-[#737373] mt-4">Help us improve</h4>

      <div className="flex gap-4 pt-3">
        <button
          onClick={() => handleFeedback("like")}
          className={`p-2 rounded-full transition ${
            feedback === "like"
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          disabled={isSubmitting}
        >
          <GoThumbsup size={24} />
        </button>

        <button
          onClick={() => handleFeedback("dislike")}
          className={`p-2 rounded-full transition ${
            feedback === "dislike"
              ? "bg-red-100 text-red-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          disabled={isSubmitting}
        >
          <GoThumbsdown size={24} />
        </button>
      </div>
    </section>
  );
}
