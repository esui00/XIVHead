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
  try {
    const { relicId } = req.params;
    const relic = await relic.findByIdAndDelete({ relicId });
    res.status(200).json(relic);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }

};