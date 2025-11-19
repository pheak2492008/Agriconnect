// src/server.ts
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger";
import authRoutes from "./routes/authRoutes";

dotenv.config();

const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const MONGO_URI = process.env.MONGO_URI || "";

export const createServer = async () => {
  const app = express();
  app.use(express.json());

  // MongoDB connection
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }

  // Swagger setup
  setupSwagger(app, PORT);

  // Test route
  app.get("/", (req: Request, res: Response) => {
    res.send("AgriConnect API is running 🚀");
  });

  // API routes
  app.use("/api/auth", authRoutes);

  return app;
};

// Start server
(async () => {
  const app = await createServer();
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📚 Swagger docs: http://localhost:${PORT}/api-docs`);
  });
})();
