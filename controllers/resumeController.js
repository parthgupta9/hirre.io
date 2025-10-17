import User from "../models/user.js";
import Project from "../models/project.js";
import Course from "../models/Course.js";
import Internship from "../models/Internship.js";
import Skill from "../models/Skill.js";

// ✅ Get full resume of logged-in user
export const getResume = async (req, res) => {
  try {
    const userId = req.user.id;

    const [user, projects, courses, internships, skills] = await Promise.all([
      User.findById(userId).select("-password"),
      Project.find({ userId }).sort("-createdAt"),
      Course.find({ userId }).sort("-date"),
      Internship.find({ userId }).sort("-startDate"),
      Skill.find({ userId }),
    ]);

    const resume = {
      profile: user,
      projects,
      courses,
      internships,
      skills,
    };

    res.json(resume);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
