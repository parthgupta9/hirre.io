import crypto from "crypto";
import Project from "../models/project.js";
import Course from "../models/Course.js";
import Internship from "../models/Internship.js";
import User from "../models/user.js"; // make sure your User model filename matches

// Helper: verify signature (X-Signature header expected)
const verifySignature = (secret, rawBody, signatureHeader) => {
  if (!signatureHeader) return false;
  const expected = crypto.createHmac("sha256", secret).update(rawBody).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signatureHeader));
};

/**
 * Webhook handler:
 * - expects header 'x-signature' containing HMAC hex
 * - body should include: { externalId, type: 'project'|'course'|'internship', email, payload }
 */
export const webhookHandler = async (req, res) => {
  try {
    const secret = process.env.WEBHOOK_SECRET;
    const signature = req.header("x-signature");
    const rawBody = req.rawBody || JSON.stringify(req.body); // ensure rawBody is set in server.js

    if (!verifySignature(secret, rawBody, signature)) {
      return res.status(401).json({ msg: "Invalid signature" });
    }

    const { externalId, type, email, payload } = req.body;
    if (!type || !email || !payload)
      return res.status(400).json({ msg: "Missing fields" });

    // Locate user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (type === "project") {
      const newProject = await Project.create({
        userId: user._id,
        title: payload.title,
        description: payload.description,
        link: payload.link || "",
        tags: payload.tags || [],
      });
      return res.status(201).json({ msg: "Project added", project: newProject });
    }

    if (type === "course") {
      const newCourse = await Course.create({
        userId: user._id,
        name: payload.name,
        provider: payload.provider,
        certificateLink: payload.certificateLink || "",
        date: payload.date,
      });
      return res.status(201).json({ msg: "Course added", course: newCourse });
    }

    if (type === "internship") {
      const newInternship = await Internship.create({
        userId: user._id,
        role: payload.role,
        company: payload.company,
        startDate: payload.startDate,
        endDate: payload.endDate,
        description: payload.description,
      });
      return res
        .status(201)
        .json({ msg: "Internship added", internship: newInternship });
    }

    return res.status(400).json({ msg: "Unknown type" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
