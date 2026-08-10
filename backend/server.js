import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();

// Database connection
import "./utils/db.js";

// Routes
import authRouter from "./routes/auth.route.js";
import violationRouter from "./routes/violation.route.js";
import categoryRouter from "./routes/category.route.js";
import quizRouter from "./routes/quiz.route.js";
import questionRouter from "./routes/question.route.js";
import attemptRouter from "./routes/attempt.route.js";
import leaderboardRouter from "./routes/leaderboard.route.js";
import userRouter from "./routes/user.route.js";
import aiRouter from "./routes/ai.route.js";

// Error handler
import { exceptionHandler } from "./middlewares/exceptionHandler.middleware.js";


// ======================================================
// CORS CONFIGURATION
// ======================================================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",

  // Old live frontend
  "https://ai-role-quiz-generator.vercel.app",

  // New live frontend
  "https://quiz-arena-five-neon.vercel.app",

  // Vercel main branch deployment
  "https://quiz-arena-git-main-adkadityas-projects.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  // Allow only known frontend origins
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Allow credentials such as cookies/auth
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Allowed HTTP methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  // Allowed request headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  // Browser preflight request
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});


// ======================================================
// MIDDLEWARE
// ======================================================

app.use(express.json());


// Static uploads folder
app.use("/uploads", express.static("uploads"));


// ======================================================
// API ROUTES
// ======================================================

app.use("/api/v1/auth", authRouter);

app.use("/api/v1/violations", violationRouter);

app.use("/api/v1", categoryRouter);

app.use("/api/v1", quizRouter);

app.use("/api/v1", questionRouter);

app.use("/api/v1", attemptRouter);

app.use("/api/v1", leaderboardRouter);

app.use("/api/v1", userRouter);

// AI routes
app.use("/api/v1/ai", aiRouter);


// ======================================================
// ROOT ROUTE
// ======================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AI Role Quiz Backend is Running 🚀",
  });
});


// ======================================================
// ERROR HANDLER
// ======================================================

app.use(exceptionHandler);


// ======================================================
// SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});