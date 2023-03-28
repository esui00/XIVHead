import mongoose from "mongoose";

const encounterSchema = mongoose.Schema(
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

const Encounter = mongoose.model("Encounter", encounterSchema);

export default Encounter;