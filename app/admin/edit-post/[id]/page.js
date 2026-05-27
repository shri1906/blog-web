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

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  /* FETCH POST */
  useEffect(() => {
    axios
      .get(`/api/posts/${id}`)
      .then((res) =>
        setForm({
          title: res.data.title,
          content: res.data.content,
          image: null,
        })
      )
      .catch(console.error);
  }, [id]);

  /* UPDATE POST (JWT PROTECTED) */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("content", form.content);
      if (form.image) data.append("image", form.image);

      await axios.put(`/api/posts/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push("/admin/posts");
    } catch (err) {
      console.error(err);
      alert("Update failed");
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
                  <label className="form-label">Change Image</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setForm({ ...form, image: e.target.files[0] })
                    }
                  />
                </div>

                <button
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
