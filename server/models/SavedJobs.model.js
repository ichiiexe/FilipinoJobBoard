import mongoose from "mongoose";

// Define mongoose schema.
const savedJobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);
