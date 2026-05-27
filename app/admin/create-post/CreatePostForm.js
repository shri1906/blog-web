"use client";

import { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    if (!form.title || !form.content) {
      setMessage("Title and content are required");
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);
      if (form.image) data.append("image", form.image);

      const token = localStorage.getItem("token");

      await axios.post("/api/posts", data, {
        headers: {
          Authorization: `Bearer ${token}`, // 🔐 JWT
        },
      });

      setMessage("✅ Post created successfully");
      setForm({ title: "", content: "", image: null });
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8">

          <div className="card shadow-sm">
            <div className="card-body">

              <h3 className="text-center fw-bold mb-4">
                Create New Post
              </h3>

              {message && (
                <div className="alert alert-info text-center">
                  {message}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* TITLE */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Post Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter post title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                {/* CONTENT */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">
                    Post Content
                  </label>
                  <textarea
                    className="form-control"
                    rows="6"
                    placeholder="Write your post content..."
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                  />
                </div>

                {/* IMAGE */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Post Image
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files[0] })
                    }
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="btn btn-custom w-100"
                  disabled={loading}
                >
                  {loading ? "Publishing..." : "Publish Post"}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
