import Job from "../models/Job.js";
import User from "../models/User.js";

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
  try {
    const { jobId } = req.params;
    const job = await job.deleteOne({ jobId });
    res.status(200).json(job);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

};