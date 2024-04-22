// Importing the User model and jwt
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

// Signup controller
export const signup = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.create({ username, password });
        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1d' });
        res.status(201).json({ message: 'User created', token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login controller
export const login = async (req, res) => {
    
    try {
        const { username, password } = req.body;
    
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Authentication failed' });
        }
        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1d' });
        res.json({ message: 'User logged in', token  , userId:user._id  });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
