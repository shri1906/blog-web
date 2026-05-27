"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";


export default function Register() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const submit = async () => {
    setLoading(true);

    try {
      const formData = new FormData();
      Object.keys(data).forEach((k) =>
        formData.append(k, data[k])
      );

      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;

      await axios.post("/api/admin/register", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Admin Registered Successfully");
      router.push("/admin/login");
      setData({});
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 col-md-3">
      <div className="card shadow">
        <div className="card-body">
          <h3 className="text-center mb-4">
            <i className="fas fa-user-plus me-2"></i>
            Registration
          </h3>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-user"></i>
            </span>
            <input
              className="form-control"
              placeholder="Full Name"
              onChange={(e) =>
                setData({ ...data, name: e.target.value })
              }
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-envelope"></i>
            </span>
            <input
              className="form-control"
              placeholder="Email"
              onChange={(e) =>
                setData({ ...data, email: e.target.value })
              }
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
              onChange={(e) =>
                setData({ ...data, password: e.target.value })
              }
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">
              <i className="fas fa-image"></i>
            </span>
            <input
              type="file"
              className="form-control"
              onChange={(e) =>
                setData({
                  ...data,
                  profileImage: e.target.files[0],
                })
              }
            />
          </div>

          <button
            className="btn btn-custom w-100"
            onClick={submit}
            disabled={loading}
          >
            <i className="fas fa-user-check me-2"></i>
            {loading ? "Registering..." : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}
