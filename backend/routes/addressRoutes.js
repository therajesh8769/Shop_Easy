

const express = require('express'); 
const { requireAuth } = require('../middlewares/authMiddleware');

const router = express.Router();
const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress
} = require('../controllers/addressController');


router.post('/address',requireAuth,  addAddress); // Add address
router.get('/addresses',requireAuth,  getAddresses); // Fetch all addresses
router.put('/addresses/:id',requireAuth,  updateAddress); // Edit
router.delete('/addresses/:id',requireAuth,  deleteAddress); // Delete
router.patch('/addresses/:id/default',requireAuth,  setDefaultAddress); // Set default
module.exports = router;