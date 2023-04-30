import Job from "../models/Job.js";
import User from "../models/User.js";
//Comment
/* CREATE */
export const createJob = async (req, res) => {
  try {
    const { userId, description} = req.body;
    const user = await User.findById(userId);
    const newJob = new Job({
      userId,
      displayName: user.displayName,
      description,
    });
    await newJob.save();

    const job = await Job.find();
    res.status(201).json(job);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedJobs = async (req, res) => {
  try {
    const job = await Job.find();
    res.status(200).json(job);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/*DELETE*/
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).send("Job not found");

    // Check if the user is an admin
const deleteJob = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).send("Job not found");

    // Check if the user is an admin
    if (user.admin === true) {
      await job.deleteOne();
      return res.send("Job deleted successfully");
    } else {
      return res.status(403).send("unauthorized: only admin can delete jobs");
    }

    await job.remove();

    res.status(200).send("Job deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

    await job.remove();

    res.status(200).send("Job deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};