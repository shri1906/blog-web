"use client";

import AdminProtected from "@/components/AdminProtected";
import CreatePostForm from "./CreatePostForm"; // optional split

export default function CreatePostPage() {
  return (
    <AdminProtected>
      <CreatePostForm />
    </AdminProtected>
  );
}
