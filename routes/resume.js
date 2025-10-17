import express from "express";
import auth from "../middleware/authMiddleware.js";
import { getResume } from "../controllers/resumeController.js";

const router = express.Router();

// Get logged-in user's resume
router.get("/", auth, getResume);

export default router;
