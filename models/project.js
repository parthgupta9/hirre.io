import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // each project must belong to a user
    },
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
    },
    link: {
      type: String,
      default: "",
    },
    tags: {
      type: [String], // e.g. ["AI", "Node.js", "MongoDB"]
      default: [],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

const Project = mongoose.model("Project", projectSchema);
export default Project;
