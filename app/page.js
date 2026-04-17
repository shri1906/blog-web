"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const formatIndianDateTime = (date) => {
  return new Date(date).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container py-5">
      {/* Modern Header */}
      <div className="row mb-5 justify-content-center text-center">
        <div className="col-lg-6">
          <h6 className="text-primary text-uppercase fw-bold ls-2">
            Journal
          </h6>
          <h2 className="display-5 fw-bold mb-3">
            Latest Stories
          </h2>
          <p className="text-muted">
            Exploring the intersection of technology and design.
          </p>
        </div>
      </div>

      <div className="row g-4">
        {posts.map((p) => (
          <div
            className="col-lg-4 col-md-6"
            key={p._id}
          >
            <div className="card h-100 border-0 shadow-sm transition-hover overflow-hidden rounded-4">

              {/* IMAGE */}
              <div
                className="overflow-hidden position-relative"
                style={{ height: "240px" }}
              >
                <Image
                  src={
                    p.image?.startsWith("http")
                      ? p.image
                      : `/uploads/${p.image}`
                  }
                  alt={p.title}
                  fill
                  unoptimized
                  className="card-img-top object-fit-cover hover-zoom"
                />

                <div className="position-absolute top-0 start-0 m-3">
                  <span className="badge bg-white text-dark shadow-sm py-2 px-3 rounded-pill fw-medium">
                    {formatIndianDateTime(p.createdAt)}
                  </span>
                </div>
              </div>

              <div className="card-body p-4 d-flex flex-column">
                <h4 className="card-title fw-bold mb-3 lh-base">
                  <Link
                    href={`/post/${p._id}`}
                    className="text-decoration-none text-dark"
                  >
                    {p.title}
                  </Link>
                </h4>

                <p className="card-text text-secondary mb-4 flex-grow-1">
                  {p.content?.substring(0, 110)}...
                </p>

                <Link
                  href={`/post/${p._id}`}
                  className="btn btn-link p-0 text-decoration-none fw-bold text-primary d-flex align-items-center"
                >
                  Read Story...
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
