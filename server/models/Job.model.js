import mongoose from "mongoose";

// Define mongoose schema.
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    keyResponsibilities: {
      type: String,
      required: true,
    },
    requirements: {
      type: String,
      required: true,
    },
    niceToHave: {
      type: String,
    },
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    salary: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
      enum: [
        "Full-time",
        "Part-time",
        "Contract",
        "Internship",
        "Live-in",
        "Remote",
      ],
    },
    experienceLevel: {
      type: String,
      required: true,
      enum: ["Entry-level", "Mid-level", "Senior-level"],
    },
    skills: {
      type: [String],
      default: [],
    },
    views: {
      type: Number,
      default: 0,
    },
    applications: {
      type: Number,
      default: 0,
    },
    applyURL: {
      type: String,
      default: "",
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Default expiration is 30 days from now
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  },
);

export const Job = mongoose.model("Job", jobSchema);
