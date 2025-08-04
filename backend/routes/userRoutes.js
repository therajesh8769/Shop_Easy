const express = require('express');
const router = express.Router();
const isAdmin = require('../middlewares/isAdmin');
const { requireAuth } = require('../middlewares/authMiddleware');


const {
    
    getUserStats,
    getAllUsers,
    getUserById,
    
    
    } = require('../controllers/userController');


// Get user statistics (admin only)
router.get('/stats', isAdmin, getUserStats);
// Get all users (admin only)
router.get('/',isAdmin, getAllUsers);
// Get user by ID (admin only)
router.get('/:id', isAdmin, getUserById);



module.exports = router;