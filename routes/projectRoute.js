import express from "express";
import auth from "../middleware/authMiddleware.js";
import * as controller from "../controllers/projects.js";

const router = express.Router();

// Routes
router.post("/", auth, controller.createProject);
router.get("/", auth, controller.getProjects);
router.get("/:id", auth, controller.getProjectById);
router.put("/:id", auth, controller.updateProject);
router.delete("/:id", auth, controller.deleteProject);

export default router;
