import Internship from "../models/Internship.js";

// ✅ Create Internship
export const createInternship = async (req, res) => {
  try {
    const internship = await Internship.create({ ...req.body, userId: req.user.id });
    res.status(201).json(internship);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Get all internships of logged-in user
export const getUserInternships = async (req, res) => {
  try {
    const internships = await Internship.find({ userId: req.user.id });
    res.json(internships);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Update internship
export const updateInternship = async (req, res) => {
  try {
    const internship = await Internship.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(internship);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Delete internship
export const deleteInternship = async (req, res) => {
  try {
    await Internship.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ msg: "Internship deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
