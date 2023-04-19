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
    try {
      const { id } = req.params;
      const user = await User.findByIdAndDelete({id});
      res.status(200).json(user);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  
  };