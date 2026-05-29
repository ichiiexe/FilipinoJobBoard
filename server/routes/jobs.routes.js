import express from "express";
import {
  createJob,
  getJobs,
  getJobById,
} from "../controllers/jobs.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Define API route endpoint.
router.post("/", protect, createJob);
// Define API route endpoint.
router.get("/", getJobs);
router.get("/:id", getJobById);

export default router;
