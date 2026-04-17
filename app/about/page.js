"use client";

import Image from "next/image";
import {
  FaPenNib,
  FaBullseye,
  FaEye,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaBootstrap,
} from "react-icons/fa";

export default function AboutPage() {
  return (
    <div className="container my-5">

      {/* HERO SECTION */}
      <div className="row align-items-center mb-5">
        <div className="col-md-6">
          <h1 className="fw-bold mb-3">About CodeAlchemy</h1>
          <p className="text-muted fs-5">
            CodeAlchemy is a modern tech blog focused on transforming
            ideas into real-world applications through clean code,
            practical tutorials, and thoughtful explanations.
          </p>
          <p className="text-muted">
            Whether you are a beginner or an experienced developer,
            this platform is designed to help you learn, grow, and
            stay updated with modern web technologies.
          </p>
        </div>

        <div className="col-md-6 text-center">
          <Image
            src="/logo.png"
            alt="About CodeAlchemy"
            width={550}
            height={380}
            className="img-fluid rounded"
            unoptimized
          />
        </div>
      </div>

      {/* WHAT WE DO */}
      <div className="row mb-5">
        <div className="col-md-12">
          <h3 className="fw-bold mb-3">
            <FaPenNib className="me-2 text-primary" />
            What We Do
          </h3>
          <p className="text-muted">
            At CodeAlchemy, we publish high-quality blog posts focused on
            web development, backend engineering, and modern JavaScript
            frameworks. Our content is designed to be practical,
            beginner-friendly, and directly applicable to real projects.
          </p>
          <p className="text-muted">
            We believe learning should be simple and hands-on, so every
            article aims to explain not just the “how”, but also the “why”.
          </p>
        </div>
      </div>

      {/* MISSION & VISION */}
      <div className="row mb-5">
        <div className="col-md-6">
          <h4 className="fw-bold mb-2">
            <FaBullseye className="me-2 text-success" />
            Our Mission
          </h4>
          <p className="text-muted">
            Our mission is to make web development learning accessible
            to everyone by breaking down complex topics into easy,
            understandable concepts with real examples.
          </p>
        </div>

        <div className="col-md-6">
          <h4 className="fw-bold mb-2">
            <FaEye className="me-2 text-warning" />
            Our Vision
          </h4>
          <p className="text-muted">
            We envision a developer community where knowledge is shared
            openly, creativity is encouraged, and learning never stops.
          </p>
        </div>
      </div>

      {/* TECH STACK */}
      <div className="row text-center">
        <h3 className="fw-bold mb-4">Technology Stack</h3>

        <div className="col-md-3 col-6 mb-3">
          <div className="card shadow-sm p-4 h-100">
            <FaReact size={36} className="text-info mx-auto" />
            <h6 className="fw-semibold mt-3">Next.js & React</h6>
            <p className="text-muted small">
              For building fast, SEO-friendly, and scalable user interfaces.
            </p>
          </div>
        </div>

        <div className="col-md-3 col-6 mb-3">
          <div className="card shadow-sm p-4 h-100">
            <FaNodeJs size={36} className="text-success mx-auto" />
            <h6 className="fw-semibold mt-3">Node.js</h6>
            <p className="text-muted small">
              Powering the backend with fast and efficient APIs.
            </p>
          </div>
        </div>

        <div className="col-md-3 col-6 mb-3">
          <div className="card shadow-sm p-4 h-100">
            <FaDatabase size={36} className="text-secondary mx-auto" />
            <h6 className="fw-semibold mt-3">MongoDB</h6>
            <p className="text-muted small">
              Flexible NoSQL database for storing blog content and users.
            </p>
          </div>
        </div>

        <div className="col-md-3 col-6 mb-3">
          <div className="card shadow-sm p-4 h-100">
            <FaBootstrap size={36} className="text-primary mx-auto" />
            <h6 className="fw-semibold mt-3">Bootstrap</h6>
            <p className="text-muted small">
              Clean, responsive design system for consistent UI.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
