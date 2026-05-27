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

// ✅ NO pre-save hook — password is already hashed by the API routes
//    (register/route.js calls bcrypt.hash before Admin.create)

const Admin =
  mongoose.models.Admin ||
  mongoose.model("Admin", adminSchema);

export default Admin;
