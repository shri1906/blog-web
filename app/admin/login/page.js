"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/admin/login", {
        email,
        password,
      });

      toast.success("Logged in successfully!");
      // 🔐 Store JWT + admin
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      router.push("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">
                <i className="fas fa-user-shield me-2"></i>
                Admin Login
              </h3>
              <form onSubmit={handleLogin}>
                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group mb-3">
                  <span className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button className="btn btn-custom w-100">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Login
                </button>
              </form>

              <p className="text-center mt-3">
                Don’t have an account?{" "}
                <a href="/admin/register">Register</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
