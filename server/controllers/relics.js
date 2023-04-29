import Relic from "../models/Relic.js";
import User from "../models/User.js";

/* CREATE */
export const createRelic = async (req, res) => {
  try {
    const { userId, description} = req.body;
    const user = await User.findById(userId);
    const newRelic = new Relic({
      userId,
      displayName: user.displayName,
      description,
    });
    await newRelic.save();

    const relic = await Relic.find();
    res.status(201).json(relic);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedRelics = async (req, res) => {
  try {
    const relic = await Relic.find();
    res.status(200).json(relic);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/*DELETE*/
export const deleteRelic = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const relic = await Relic.findById(id);
    if (!relic) return res.status(404).send("Relic not found");

    // Check if the user is an admin
const deleteRelic = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const relic = await Relic.findById(id);
    if (!relic) return res.status(404).send("Relic not found");

    // Check if the user is an admin
    if (user.admin === true) {
      await relic.deleteOne();
      return res.send("Relic deleted successfully");
    } else {
      return res.status(403).send("unauthorized: only admin can delete relics");
    }

    await relic.remove();

    res.status(200).send("Relic deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

    await relic.remove();

    res.status(200).send("Relic deleted successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};