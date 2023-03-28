import mongoose from "mongoose";

const relicSchema = mongoose.Schema(
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

const Relic = mongoose.model("Relic", relicSchema);

export default Relic;