import mongoose from "mongoose";

const jobSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    description: String,
  },
  { timestamps: true }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;