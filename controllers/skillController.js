import Skill from "../models/Skill.js";

// ✅ Add a new skill
export const addSkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;
    const skill = new Skill({ user: req.user.id, name, proficiency });
    await skill.save();
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ message: "Error adding skill", error });
  }
};

// ✅ Get all skills for logged-in user
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find({ user: req.user.id });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching skills", error });
  }
};

// ✅ Update a skill
export const updateSkill = async (req, res) => {
  try {
    const { name, proficiency } = req.body;
    const skill = await Skill.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { name, proficiency },
      { new: true }
    );
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json(skill);
  } catch (error) {
    res.status(500).json({ message: "Error updating skill", error });
  }
};

// ✅ Delete a skill
export const deleteSkill = async (req, res) => {
  try {
    const skill = await Skill.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    res.json({ message: "Skill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting skill", error });
  }
};
