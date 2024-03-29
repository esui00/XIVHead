import Encounter from "../models/Encounter.js";
import User from "../models/User.js";

/* CREATE */
export const createEncounter = async (req, res) => {
  
  try {
    const { userId, description} = req.body;
    const user = await User.findById(userId);
    //null
    const newEncounter = new Encounter({
      userId,
      displayName: user.displayName,
      description,
    });
    await newEncounter.save();

    const encounter = await Encounter.find();
    res.status(201).json(encounter);
  } catch (err) {
    console.log(err);
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

/* UPDATE */
export const updateEncounter = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const encounter = await Encounter.findById(id);
    if (!encounter) return res.status(404).send("Encounter not found");

    // Check if the user is the owner of the encounter
    if (encounter.userId !== user._id.toString()) {
      return res.status(403).send("Unauthorized: You can only edit your own encounters");
    }

    const { description } = req.body;

    encounter.description = description;

    const updatedEncounter = await encounter.save();

    res.status(200).json(updatedEncounter);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

/*DELETE*/
export const deleteEncounter = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const encounter = await Encounter.findById(id);
    if (!encounter) return res.status(404).send("Encounter not found");

    // Check if the user is an admin
const deleteEncounter = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const encounter = await Encounter.findById(id);
    if (!encounter) return res.status(404).send("Encounter not found");

    // Check if the user is an admin
    if (user.admin === true) {
      await encounter.deleteOne();
      return res.send("Encounter deleted successfully");
    } else {
      return res.status(403).send("unauthorized: only admin can delete encounters");
    }

    await encounter.remove();

    res.status(200).send("Encounter deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

    await encounter.remove();

    res.status(200).send("Encounter deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};