const express=require('express');
const router = express.Router();
const {signup, login} = require('../controllers/authController');

// Middleware to protect routes for admin users only
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;