"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

const formatIndianDateTime = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const renderContentWithParagraphs = (content) => {
  if (!content) return null;

  const lines = content.split("\n").filter(Boolean);

  if (lines.length <= 8) {
    return <p style={{ textAlign: "justify" }}>{content}</p>;
  }

  const paragraphs = [];
  for (let i = 0; i < lines.length; i += 8) {
    paragraphs.push(lines.slice(i, i + 8).join(" "));
  }

  return paragraphs.map((para, index) => (
    <p
      key={index}
      className={`post-paragraph ${index === 0 ? "drop-cap" : ""}`}
    >
      {para}
    </p>
  ));
};

export default function PostPage() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    username: "",
    rating: 5,
    comment: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    axios.get(`/api/posts/${id}`).then((res) => setPost(res.data));
    axios.get(`/api/reviews/${id}`).then((res) => setReviews(res.data));
  }, [id]);

  const submitReview = async () => {
    setError("");

    if (!form.username || !form.comment) {
      setError("Name and comment are required");
      return;
    }

    await axios.post("/api/reviews", {
      postId: id,
      ...form,
    });

    const res = await axios.get(`/api/reviews/${id}`);
    setReviews(res.data);
    setForm({ username: "", rating: 5, comment: "" });
  };

  if (!post) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum, r) => sum + Number(r.rating),
            0
          ) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="container mt-4">
      <h1 className="mb-2">{post.title}</h1>

      <p>Posted on: {formatIndianDateTime(post.createdAt)}</p>

      {avgRating && (
        <p className="text-warning fw-semibold">
          ⭐ {avgRating} / 5 ({reviews.length} reviews)
        </p>
      )}

      <div
        className="mb-4 border rounded shadow-sm"
        style={{ position: "relative", height: "450px" }}
      >
        <Image
          src={
            post.image?.startsWith("http")
              ? post.image
              : `/uploads/${post.image}`
          }
          alt={post.title}
          fill
          unoptimized
          style={{ objectFit: "cover" }}
        />
      </div>

      {renderContentWithParagraphs(post.content)}

      <hr className="my-5" />

      <h3 className="mb-3">User Reviews</h3>

      {reviews.length === 0 && (
        <p className="text-muted">
          No reviews yet. Be the first!
        </p>
      )}

      {reviews.map((r) => (
        <div
          key={r._id}
          className="mb-3 p-3 border rounded"
        >
          <strong>{r.username}</strong>
          <span className="text-warning ms-2">
            {"⭐".repeat(r.rating)}
          </span>
          <p className="mb-1 mt-1">{r.comment}</p>
          <small className="text-muted">
            {formatIndianDateTime(r.createdAt)}
          </small>
        </div>
      ))}

      <hr className="my-4" />

      {/* REVIEW FORM */}
      <div className="mt-5 mb-4">
        <div className="card shadow-sm">
          <div
            className="card-body"
            style={{ background: "#fcf8f8" }}
          >
            <h4 className="text-center mb-4 fw-bold">
              Leave a Review
            </h4>

            {error && (
              <div className="alert alert-danger py-2 text-center">
                {error}
              </div>
            )}

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Your Name
              </label>
              <input
                className="form-control"
                placeholder="Enter your name"
                value={form.username}
                style={{ background: "#fcf8f8" }}
                onChange={(e) =>
                  setForm({
                    ...form,
                    username: e.target.value,
                  })
                }
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">
                Your Rating
              </label>
              <div className="d-flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`btn ${
                      form.rating >= star
                        ? "btn-warning"
                        : "btn-outline-warning"
                    }`}
                    onClick={() =>
                      setForm({ ...form, rating: star })
                    }
                  >
                    ⭐
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">
                Your Review
              </label>
              <textarea
                className="form-control"
                rows="4"
                style={{ background: "#fcf8f8" }}
                placeholder="Write your thoughts..."
                value={form.comment}
                onChange={(e) =>
                  setForm({
                    ...form,
                    comment: e.target.value,
                  })
                }
              />
            </div>

            <button
              className="btn btn-custom w-40 fw-semibold"
              onClick={submitReview}
            >
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
