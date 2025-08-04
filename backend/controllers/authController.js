const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
console.log('JWT_SECRET:', JWT_SECRET);

// Signup function
exports.signup = async (req, res) => {
    const { name, email, password, mobile } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const existingMobile = await User.findOne({ mobile });
        if (existingMobile) {
            return res.status(400).json({ message: "Mobile number already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const user = await User.create({
            name, 
            email,
            password: hashedPassword,
            mobile,
            createdAt: Date.now(),
        });

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id,isAdmin:user.isAdmin }, JWT_SECRET, {
            expiresIn: '7d', // Token expires in 7 days
        });

        // Send the response
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                isAdmin: user.isAdmin, // Include isAdmin in the response
            },
            message: 'User created successfully',
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id,isAdmin:user.isAdmin }, JWT_SECRET, {
            expiresIn: '7d', // Token expires in 7 days
        });

        // Send the response
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                isAdmin: user.isAdmin, // Include isAdmin in the response
            },
            message: 'Login successful',
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};