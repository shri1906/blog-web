"use client";

import { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaCommentDots,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert("");
    setLoading(true);

    try {
      await axios.post("/api/contact", form);

      setAlert("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setAlert("❌ Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div className="row g-4 align-items-stretch">

        {/* LEFT: CONTACT INFO */}
        <div className="col-lg-5">
          <div className="card shadow-sm h-100 nav-bg text-light">
            <div className="card-body p-4">

              <h3 className="fw-bold mb-3">Get in Touch</h3>
              <p className="text-light-50 mb-4">
                Feel free to reach out for collaborations, questions,
                or feedback. We’d love to hear from you.
              </p>

              <div className="d-flex align-items-start mb-3">
                <FaEnvelope className="me-3 mt-1" />
                <div>
                  <p className="mb-0">contact@codealchemy.dev</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-3">
                <FaPhoneAlt className="me-3 mt-1" />
                <div>
                  <p className="mb-0">+91 98765 43210</p>
                </div>
              </div>

              <div className="d-flex align-items-start mb-4">
                <FaMapMarkerAlt className="me-3 mt-1" />
                <div>
                  <p className="mb-0">
                    Bengaluru, Karnataka<br />India
                  </p>
                </div>
              </div>

              <hr className="border-secondary" />

              <p className="small mb-0">
                We usually respond within 24 hours.
              </p>

            </div>
          </div>
        </div>

        {/* RIGHT: CONTACT FORM */}
        <div className="col-lg-7">
          <div className="card shadow-sm h-100">
            <div className="card-body p-4">

              <h3 className="fw-bold mb-3">Send a Message</h3>

              {alert && (
                <div className="alert alert-info text-center">
                  {alert}
                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* NAME */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Name</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaUser />
                    </span>
                    <input
                      className="form-control"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Message</label>
                  <div className="input-group">
                    <span className="input-group-text align-items-start pt-2">
                      <FaCommentDots />
                    </span>
                    <textarea
                      className="form-control"
                      rows="5"
                      placeholder="Write your message..."
                      value={form.message}
                      onChange={(e) =>
                        setForm({ ...form, message: e.target.value })
                      }
                      required
                    />
                  </div>
                </div>

                <button
                  className="btn btn-custom w-100"
                  disabled={loading}
                >
                  <FaPaperPlane className="me-2" />
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
