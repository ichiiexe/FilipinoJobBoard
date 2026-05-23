import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      unique: true,
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
    role: {
      type: String,
      default: "jobseeker", // Default role is jobseeker
      enum: ["jobseeker", "admin"], // Allowed roles
    },
    avatar: {
      type: String,
      default: "default-avatar.png", // Default avatar image
    },
    bio: {
      type: String,
      default: "",
    },
    skills: {
      type: [String],
      default: [],
    },
    resume: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

export const User = mongoose.model("User", userSchema);
