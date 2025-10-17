import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createInternship,
  getUserInternships,
  updateInternship,
  deleteInternship,
} from "../controllers/internshipController.js";

const router = express.Router();

// Routes
router.post("/", auth, createInternship);
router.get("/", auth, getUserInternships);
router.put("/:id", auth, updateInternship);
router.delete("/:id", auth, deleteInternship);

export default router;

