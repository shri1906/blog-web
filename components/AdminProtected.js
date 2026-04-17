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
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) return null;

  return children;
}
