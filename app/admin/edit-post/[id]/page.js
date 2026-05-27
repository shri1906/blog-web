"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import AdminProtected from "@/components/AdminProtected";

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    content: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Token read inside handlers only — never at render/SSR time
  const getToken = () => localStorage.getItem("token");

  /* FETCH POST */
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/posts/${id}`)
      .then((res) =>
        setForm({
          title: res.data.title,
          content: res.data.content,
          image: null,
        })
      )
      .catch(() => setError("Failed to load post."));
  }, [id]);

  /* UPDATE POST */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = getToken();
    if (!token) {
      setError("You are not authenticated.");
      return;
    }

    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);
      // ✅ Only append image if a new one was selected
      if (form.image) data.append("image", form.image);

      await axios.put(`/api/posts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/admin/posts");
    } catch (err) {
      const msg = err.response?.data?.error || "Update failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminProtected>
      <div className="container my-5">
        <div className="col-lg-6 mx-auto">
          <div className="card shadow-sm">
            <div className="card-body">

              <h3 className="text-center fw-bold mb-4">
                Edit Post
              </h3>

              {error && (
                <div className="alert alert-danger text-center">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Title</label>
                  <input
                    className="form-control"
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Content</label>
                  <textarea
                    className="form-control"
                    rows="6"
                    value={form.content}
                    onChange={(e) =>
                      setForm({ ...form, content: e.target.value })
                    }
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Change Image (optional)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files[0] })
                    }
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-custom w-100"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Post"}
                </button>
              </form>

            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
}
