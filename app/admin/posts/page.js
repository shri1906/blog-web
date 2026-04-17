"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import AdminProtected from "@/components/AdminProtected";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* FETCH POSTS */
  const fetchPosts = async () => {
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  /* OPEN CONFIRM MODAL */
  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  /* CLOSE MODAL */
  const closeModal = () => {
    setShowModal(false);
    setDeleteId(null);
  };

  /* CONFIRM DELETE */
  const confirmDelete = async () => {
    if (!deleteId) return;

    await axios.delete(`/api/posts/${deleteId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Post deleted Successfully!");
    closeModal();
    fetchPosts();
  };

  return (
    <AdminProtected>
      <div className="container my-5">
        <h2 className="fw-bold mb-4">Manage Posts</h2>

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
                    onClick={() => openDeleteModal(p._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && (
          <div
            className="modal fade show"
            style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title text-danger">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  />
                </div>

                <div className="modal-body">
                  <p>
                    Are you sure you want to delete this post?
                    <br />
                    <strong>This action cannot be undone.</strong>
                  </p>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={closeModal}>
                    Cancel
                  </button>
                  <button className="btn btn-danger" onClick={confirmDelete}>
                    Yes, Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminProtected>
  );
}
