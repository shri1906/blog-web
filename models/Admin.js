import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ IMPORTANT: model name MUST be "Admin"
const Admin =
  mongoose.models.Admin || mongoose.model("Admin", adminSchema);

export default Admin;
