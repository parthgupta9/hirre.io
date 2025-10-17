import Project from "../models/project.js";

// ✅ Create Project
export const createProject = async (req, res) => {
  try {
    const payload = { ...req.body, userId: req.user.id };
    const project = await Project.create(payload);
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get all projects of logged-in user
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).sort("-createdAt");
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Get project by ID
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user.id });
    if (!project) return res.status(404).json({ msg: "Project not found" });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Update Project
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Project not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};

// ✅ Delete Project
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ msg: "Project not found or unauthorized" });
    res.json({ msg: "Project removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
};
