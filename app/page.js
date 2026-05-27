"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const formatIndianDateTime = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await axios.get("/api/posts");
      setPosts(
        Array.isArray(res.data)
          ? res.data
          : []
      );

    } catch (err) {
      console.error("Fetch error:", err);

    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <h4>Loading posts...</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="row mb-5 justify-content-center text-center">

        <div className="col-lg-6">

          <h6 className="text-primary text-uppercase fw-bold">
            Journal
          </h6>

          <h2 className="display-5 fw-bold mb-3">
            Latest Stories
          </h2>

          <p className="text-muted">
            Exploring the intersection of
            technology and design.
          </p>

        </div>
      </div>

      {/* EMPTY STATE */}
      {posts.length === 0 ? (
        <div className="text-center py-5">
          <h4>No posts found</h4>

          <p className="text-muted">
            Create your first blog post.
          </p>
        </div>
      ) : (

        <div className="row g-4">

          {posts.map((p) => (

            <div
              className="col-lg-4 col-md-6"
              key={p._id}
            >

              <div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">

                {/* IMAGE */}
                <div
                  className="position-relative overflow-hidden"
                  style={{ height: "240px" }}
                >

                  <Image
                    src={
                      p.image
                        ? (
                            p.image.startsWith("http")
                              ? p.image
                              : `/uploads/${p.image}`
                          )
                        : "/placeholder.png"
                    }
                    alt={p.title || "Post image"}
                    fill
                    unoptimized
                    className="object-fit-cover"
                  />

                  {/* DATE BADGE */}
                  <div className="position-absolute top-0 start-0 m-3">

                    <span className="badge bg-white text-dark shadow-sm py-2 px-3 rounded-pill">

                      {formatIndianDateTime(
                        p.createdAt
                      )}

                    </span>

                  </div>
                </div>

                {/* CONTENT */}
                <div className="card-body p-4 d-flex flex-column">

                  <h4 className="fw-bold mb-3">

                    <Link
                      href={`/post/${p._id}`}
                      className="text-decoration-none text-dark"
                    >
                      {p.title}
                    </Link>

                  </h4>

                  <p className="text-secondary flex-grow-1">

                    {p.content
                      ? `${p.content.substring(0, 110)}...`
                      : "No content available."}

                  </p>

                  <Link
                    href={`/post/${p._id}`}
                    className="btn btn-link p-0 text-decoration-none fw-bold"
                  >
                    Read Story →
                  </Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}