import { Job } from "../models/Job.model.js";

// Controller function handling a request.
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      companyName,
      location,
      salary,
      jobType,
      experienceLevel,
      skills = [],
      applyURL = "",
    } = req.body;

    if (
      !title ||
      !description ||
      !companyName ||
      !location ||
      !salary ||
      !jobType ||
      !experienceLevel
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newJob = new Job({
      title,
      description,
      companyName,
      location,
      salary,
      jobType,
      experienceLevel,
      skills,
      applyURL,
      postedBy: req.user._id,
    });

    await newJob.save();

    res.status(201).json({ job: newJob });
  } catch (error) {
    console.error("Create job error:", error);
    res.status(500).json({ message: error.message });
  }
};

// Controller function handling a request.
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .sort({ createdAt: -1 })
      .populate("postedBy", "fullName email");
    res.status(200).json({ jobs });
  } catch (error) {
    console.error("Get jobs error:", error);
    res.status(500).json({ message: error.message });
  }
};
