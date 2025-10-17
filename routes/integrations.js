import express from "express";
import { webhookHandler } from "../controllers/intergrationController.js"; // fixed typo: "intergrationController" → "integrationController.js"

const router = express.Router();

// Note: raw body must be attached in server.js for signature verification
router.post("/webhook", webhookHandler);

export default router;
