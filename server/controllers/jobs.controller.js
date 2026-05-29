import { Job } from "../models/Job.model.js";

// Controller function handling a request.
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      keyResponsibilities,
      requirements,
      niceToHave = "",
      companyName,
      location,
      salary,
      jobType,
      experienceLevel,
      skills = [],
      applyURL = "",
      expiresAt,
    } = req.body;

    if (
      !title ||
      !description ||
      !keyResponsibilities ||
      !requirements ||
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
      keyResponsibilities,
      requirements,
      niceToHave,
      companyName,
      location,
      salary,
      jobType,
      experienceLevel,
      skills,
      applyURL,
      expiresAt,
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

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id).populate("postedBy", "fullName email");

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.error("Get job by id error:", error);
    res.status(500).json({ message: error.message });
  }
};
