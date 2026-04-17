"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import AdminProtected from "@/components/AdminProtected";
import {
  FaFileAlt,
  FaStar,
  FaUsers,
  FaClock,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const fetchStats = async (pageNumber) => {
    const res = await axios.get(
      `/api/admin/stats?page=${pageNumber}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setStats(res.data);
  };

  /* ALL POSTS */
  const fetchPosts = async () => {
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchStats(page);
    fetchPosts();
  }, [page]);

  if (!stats) {
    return (
      <AdminProtected>
        <div className="container my-5 text-center">
          Loading dashboard...
        </div>
      </AdminProtected>
    );
  }

  return (
    <AdminProtected>
      <div className="container my-5">
        <h2 className="fw-bold mb-4">Admin Dashboard</h2>

        {/* ===== STATS ===== */}
        <div className="row g-4 mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body d-flex align-items-center">
                <FaFileAlt className="text-primary me-3" size={28} />
                <div>
                  <small>Total Posts</small>
                  <h4 className="fw-bold">{stats.totalPosts}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body d-flex align-items-center">
                <FaStar className="text-warning me-3" size={28} />
                <div>
                  <small>Total Reviews</small>
                  <h4 className="fw-bold">{stats.totalReviews}</h4>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body d-flex align-items-center">
                <FaUsers className="text-success me-3" size={28} />
                <div>
                  <small>Total Admins</small>
                  <h4 className="fw-bold">{stats.totalAdmins}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== LATEST POSTS ===== */}
        <div className="card shadow-sm mb-5">
          <div className="card-body">
            <h5 className="fw-bold mb-3">
              <FaClock className="me-2" />
              Latest Posts
            </h5>

            <ul className="list-group mb-3">
              {stats.latestPosts.map((post) => (
                <li
                  key={post._id}
                  className="list-group-item d-flex justify-content-between"
                >
                  <span>{post.title}</span>
                  <small className="text-muted">
                    {new Date(post.createdAt).toLocaleDateString("en-IN")}
                  </small>
                </li>
              ))}
            </ul>

            {/* PAGINATION */}
            <div className="d-flex justify-content-between">
              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <FaChevronLeft /> Prev
              </button>

              <span className="text-muted">
                Page {stats.currentPage} of {stats.totalPages}
              </span>

              <button
                className="btn btn-outline-secondary btn-sm"
                disabled={page === stats.totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next <FaChevronRight />
              </button>
            </div>
          </div>
        </div>

        {/* ===== MANAGE POSTS ===== */}
        <div className="text-end mt-4">
          <Link href="/admin/posts" className="btn btn-outline-primary">
            Manage Posts →
          </Link>
        </div>
      </div>
    </AdminProtected>
  );
}
