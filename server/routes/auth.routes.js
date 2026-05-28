import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/auth.controller.js";
import protect from "../middleware/auth.middleware.js";

const router = express.Router();

// Define API route endpoint.
router.post("/register", registerUser);
// Define API route endpoint.
router.post("/login", loginUser);
// Define API route endpoint.
router.get("/me", protect, getMe);

export default router;
