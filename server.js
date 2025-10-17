import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Import routes
import authRoutes from "./routes/auth.js";
import projectRoutes from "./routes/projectRoute.js";
import courseRoutes from "./routes/courses.js";
import internshipRoutes from "./routes/internship.js";
import skillRoutes from "./routes/skillRoutes.js";
import resumeRoutes from "./routes/resume.js";
import integrationRoutes from "./routes/integrations.js";

dotenv.config();
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // for signature verification
    },
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/integrations", integrationRoutes);

// Root route for sanity check
app.get("/", (req, res) => {
  res.send("🚀 Hirre Resume System API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
