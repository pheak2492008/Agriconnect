import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { setupSwagger } from "./config/swagger";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";
import userRoutes from "./routes/userRole";

dotenv.config();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
const MONGODB_URI = process.env.MONGODB_URI as string;

export const createServer = async () => {
  const app = express();
  app.use(express.json());

  // MongoDB connection
  try {
    if (!MONGODB_URI) {
      throw new Error("❌ MONGODB_URI is missing in .env file");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("✅ MongoDB connected!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }

  // Swagger
  setupSwagger(app);

  // Test route
  app.get("/", (req: Request, res: Response) => {
    res.send("AgriConnect API is running 🚀");
  });

  // API routes
  app.use("/api/auth", authRoutes);
  app.use("/api/product", productRoutes);
  app.use("/api/user", userRoutes);

  return app;
};
