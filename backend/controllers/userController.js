
const Users = require('../models/User.js');



exports.getUserStats = async (req, res) => {
    try {
      const totalUsers = await Users.countDocuments();
      res.status(200).json(totalUsers);
      
     
    } catch (err) {
      res.status(500).json({ error: "Failed to count users" });
    }
  };
  

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().sort({ createdAt: -1 });
    res.status(200).json(users);
    console.log(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Users' });
    }
};


exports.getUserById = async (req, res) => {
  try {
    const user = await Users.findOne({ id: req.params.id });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};
