import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";

dotenv.config();

const app = express();

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: isDev ? true : process.env.CLIENT_URL,
    credentials: true,
  }),
);

app.use(express.json());

//routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send(`API running on port ${process.env.PORT}`);
});

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(`Connected to MongoDB`);

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });
