import express from "express";
import { createJob, getJobs } from "../controllers/jobs.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Define API route endpoint.
router.post("/", protect, createJob);
// Define API route endpoint.
router.get("/", getJobs);

export default router;
