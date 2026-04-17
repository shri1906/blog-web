"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // 👈 detect route change

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]); // 👈 re-run on navigation

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark nav-bg shadow-sm fixed-top">
      <div className="container">
        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" href="/">
          <Image
            src="/logo12.png"
            alt="Logo"
            width={50}
            height={50}
            unoptimized
          />
          <span className="ms-2 fw-bold">CodeAlchemy</span>
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* LINKS */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-lg-auto text-center text-lg-start align-items-center align-items-lg-center">
            <li className="nav-item">
              <Link className="nav-link" href="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" href="/contact">
                Contact
              </Link>
            </li>

            {/* NOT LOGGED IN */}
            {!isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/admin/register">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/admin/login">
                    Login
                  </Link>
                </li>
              </>
            )}

            {/* LOGGED IN */}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/admin/dashboard">
                    Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/admin/create-post">
                    Create Post
                  </Link>
                </li>

                <li className="nav-item">
                  <button
                    className="btn btn-sm btn-custom ms-lg-3 mt-2 mt-lg-0"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
