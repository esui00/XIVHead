import User from "../models/User.js";

//Read
export const getUser = async(req,res) =>{
    try {
        const{id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};


/*DELETE*/
export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    const user = await User.findById(userId);
  
  
    try {
      await user.remove();
      res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  };