"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AdminProtected from "@/components/AdminProtected";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  // ✅ Read token inside useEffect (client-side only) to avoid hydration mismatch
  const getToken = () => localStorage.getItem("token");

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(res.data);
    } catch (err) {
      console.error("Fetch posts error:", err);
      setError("Failed to load posts.");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id) => {
    if (!confirm("Delete this post?")) return;

    const token = getToken();
    if (!token) {
      setError("You are not authenticated.");
      return;
    }

    try {
      await axios.delete(`/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // ✅ Optimistic update — remove from state immediately
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      const msg = err.response?.data?.error || "Delete failed";
      setError(msg);
    }
  };

  return (
    <AdminProtected>
      <div className="container my-5">
        <h2 className="fw-bold mb-4">Manage Posts</h2>

        {error && (
          <div className="alert alert-danger alert-dismissible">
            {error}
            <button
              className="btn-close"
              onClick={() => setError("")}
            />
          </div>
        )}

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th width="180">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>
                  <Link
                    href={`/admin/edit-post/${p._id}`}
                    className="btn btn-sm btn-warning me-2"
                  >
                    <FaEdit />
                  </Link>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deletePost(p._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminProtected>
  );
}
