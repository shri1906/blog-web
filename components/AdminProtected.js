"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminProtected({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/admin/login");
      return;
    }

    // ✅ Validate token by checking its structure (JWT has 3 parts)
    // and that it hasn't expired via the payload's exp field
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        router.push("/admin/login");
        return;
      }

      setLoading(false);
    } catch {
      // Malformed token
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      router.push("/admin/login");
    }
  }, [router]);

  if (loading) return null;

  return children;
}
