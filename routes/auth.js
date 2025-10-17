import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/auth.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Get logged-in user (Protected)
router.get("/me", auth, getUserProfile);

export default router;
