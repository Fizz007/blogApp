import React, { useState } from "react";
import { GoThumbsup, GoThumbsdown } from "react-icons/go";
import { client } from "../../client"; 

export default function CommentSection({ postId }) {
  const [value, setValue] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLike = () => {
    const newValue = feedback === "like" ? null : "like";
    setFeedback(newValue);
  };

  const handleDislike = () => {
    const newValue = feedback === "dislike" ? null : "dislike";
    setFeedback(newValue);
  };

  const handleSubmit = async () => {
    if (!value.trim()) {
      alert("Please write a comment before submitting!");
      return;
    }

    setIsSubmitting(true);
    try {
      await client.create({
        _type: "comment",
        text: value,
        feedback: feedback || null,
        post: {
          _type: "reference",
          _ref: postId,
        },
        createdAt: new Date().toISOString(),
      });

      alert("✅ Comment saved successfully!");
      setValue(""); // clear textarea
      setFeedback(null);
    } catch (err) {
      console.error("Error saving comment:", err);
      alert("❌ Failed to save comment. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <section className="pt-[32px] pb-[16px]">
      <h4 className="font-medium text-[#151515] mb-2">
        Did you find this useful? Leave a comment
      </h4>

      <h4 className="font-semibold text-[#737373] pb-[12px]">Comment</h4>

      <textarea
        id="comment"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        rows="5"
        placeholder="Please share your comments here..."
        className="w-full border border-[#D9D9D9] p-2 rounded-md placeholder:text-[#A3A3A3] focus:outline-none focus:ring-1 focus:ring-[#007AFF]"
        disabled={isSubmitting}
      />

      <h4 className="font-semibold text-[#737373] mt-4">Help us improve</h4>
      <div className="flex gap-4 pt-3">
        <button
          onClick={handleLike}
          className={`p-2 rounded-full transition ${
            feedback === "like"
              ? "bg-blue-100 text-blue-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          aria-label="Like"
          disabled={isSubmitting}
        >
          <GoThumbsup size={24} />
        </button>

        <button
          onClick={handleDislike}
          className={`p-2 rounded-full transition ${
            feedback === "dislike"
              ? "bg-red-100 text-red-600"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          aria-label="Dislike"
          disabled={isSubmitting}
        >
          <GoThumbsdown size={24} />
        </button>
      </div>
    </section>
  );
}
