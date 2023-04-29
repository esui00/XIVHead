import EncounterPage from "../models/EncounterPage.js";
import User from "../models/User.js";

/* CREATE */
export const createEncounterPage = async (req, res) => {
  try {
    const {description} = req.body;
    const newEncounterPage = new EncounterPage({
      description,
    });
    await newEncounterPage.save();

    const encounterPage = await EncounterPage.find();
    res.status(201).json(encounterPage);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedEncounterPage = async (req, res) => {
  try {
    const encounterPage = await EncounterPage.find();
    res.status(200).json(encounterPage);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */
export const updateEncounterPage = async (req, res) => {
    try {
      const { description } = req.body;
      const encounterPage = await EncounterPage.findOneAndUpdate({}, { description });
      res.status(200).json(encounterPage);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };
/*DELETE*/
export const deleteEncounterPage = async (req, res) => {
  try {
    const { _id} = req.params;
    const encounterPage = await EncounterPage.deleteOne({ _id });
    res.status(200).json(encounterPage);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

};