import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createCourse,
  getUserCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

// Routes
router.post("/", auth, createCourse);
router.get("/", auth, getUserCourses);
router.put("/:id", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);

export default router;

