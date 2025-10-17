import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  addSkill,
  getSkills,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";

const router = express.Router();

// Route definitions
router.post("/", auth, addSkill);
router.get("/", auth, getSkills);
router.put("/:id", auth, updateSkill);
router.delete("/:id", auth, deleteSkill);

export default router;
