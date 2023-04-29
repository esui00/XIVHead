import mongoose from "mongoose";

const encounterPageSchema = mongoose.Schema(
  {
    description: String,
  },
  { timestamps: true }
);

const EncounterPage = mongoose.model("EncounterPage", encounterPageSchema);

export default EncounterPage;