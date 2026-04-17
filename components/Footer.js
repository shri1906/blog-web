"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="nav-bg text-light">
      <div className="container py-4">
        <div className="row">

          {/* Brand */}
          <div className="col-md-4 mb-1">
            <p className="fw-bold">MyBlog</p>
            <p className="">
              A modern blog platform built with Next.js, Node.js and MongoDB.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-1">
            <p className="fw-bold">Quick Links</p>
            <ul className="list-unstyled">
              <li>
                <Link href="/" className="text-decoration-none text-light">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-decoration-none text-light">
                  About
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-decoration-none text-light">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/admin/register" className="text-decoration-none text-light">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-decoration-none text-light">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-md-4 mb-1">
            <p className="fw-bold">Follow Us</p>
            <div className="d-flex gap-3">
              <a href="#" className="text-light fs-5">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="text-light fs-5">
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

        </div>

        <hr className="border-secondary" />

        <div className="text-center">
          © {new Date().getFullYear()} CodeAlchemy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
