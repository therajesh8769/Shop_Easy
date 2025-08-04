const User = require('../models/User');
const requireAuth = require('../middlewares/authMiddleware');


// Add new address
exports.addAddress = async (req, res) => {
    try {
        console.log("Adding address:", req.user.id);
      const user = await User.findById(req.user.id);
      
      user.addresses.push(req.body);
      await user.save();
      res.status(201).json({ message: 'Address added' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add address' });
    }
  };
  
  // Get all addresses
  exports.getAddresses = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
     
      res.json(user.addresses);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch addresses' });
    }
  };
  
  // Update address by ID
  exports.updateAddress = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      const address = user.addresses.id(req.params.id);
  
      if (!address) return res.status(404).json({ error: 'Address not found' });
  
      // Overwrite fields
      Object.assign(address, req.body);
      await user.save();
  
      res.json({ message: 'Address updated' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to update address' });
    }
  };
  
  // Delete address by ID
  exports.deleteAddress = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.addresses = user.addresses.filter(addr => addr._id.toString() !== req.params.id);
      await user.save();
      res.json({ message: 'Address deleted' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete address' });
    }
  };
  
  // Set default address
  exports.setDefaultAddress = async (req, res) => {
    try {
      const user = await User.findById(req.user.id);
      user.addresses.forEach(addr => {
        addr.isDefault = addr._id.toString() === req.params.id;
      });
      await user.save();
      res.json({ message: 'Default address set' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to set default address' });
    }
  };