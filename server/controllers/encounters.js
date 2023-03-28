import Encounter from "../models/Encounter.js";
import User from "../models/User.js";

/* CREATE */
export const createEncounter = async (req, res) => {
  try {
    const { userId, description} = req.body;
    const user = await User.findById(userId);
    const newEncounter = new Encounter({
      userId,
      displayName: user.displayName,
      description,
    });
    await newEncounter.save();

    const encounter = await Encounter.find();
    res.status(201).json(encounter);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedEncounters = async (req, res) => {
  try {
    const encounter = await Encounter.find();
    res.status(200).json(encounter);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/*DELETE*/
export const deleteEncounter = async (req, res) => {
  try {
    const { encounterId } = req.params;
    const encounter = await encounter.deleteOne({ encounterId });
    res.status(200).json(encounter);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

};