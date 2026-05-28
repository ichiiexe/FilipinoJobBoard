import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import jobsRoutes from "./routes/jobs.routes.js";

dotenv.config();

// Create the Express application.
const app = express();

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

// Register middleware with Express.
app.use(
  cors({
    origin: isDev ? true : process.env.CLIENT_URL,
    credentials: true,
  }),
);

// Register middleware with Express.
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
// Register middleware with Express.
app.use("/api/jobs", jobsRoutes);

app.get("/", (req, res) => {
  res.send(`API running on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(`Connected to MongoDB`);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
