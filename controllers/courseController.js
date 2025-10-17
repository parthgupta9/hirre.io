import Course from "../models/Course.js";

// ✅ Create Course
export const createCourse = async (req, res) => {
  try {
    const course = await Course.create({ ...req.body, userId: req.user.id });
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Get all courses for logged-in user
export const getUserCourses = async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.user.id });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Update course
export const updateCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    res.json(course);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Delete course
export const deleteCourse = async (req, res) => {
  try {
    await Course.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ msg: "Course deleted" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
