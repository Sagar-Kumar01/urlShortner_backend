import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const handelSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password){
            return  res.status(400).json({success: false, message: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({success: false, message: 'User already exists' });
        }
        const newUser = await User.create({ name, email, password });

        const token = jwt.sign({ email}, process.env.JWT_SECRET, { expiresIn: '1d' });
        const expiryDate = new Date(Date.now() + 86400000);
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: true,
            sameSite: 'none', 
            maxAge: 86400000,
            expires: expiryDate
        });

        res.status(201).json({ success: true, token , message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({success: false,message: 'Server error' });
    }
};

export const handelLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(400).json({success: false, message: 'Invalid credentials' });
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

        const expiryDate = new Date(Date.now() + 86400000);
        res.cookie('token', token, { 
            httpOnly: true, 
            secure: true,
            sameSite: 'none', 
            maxAge: 86400000,
            expires: expiryDate
        });
        res.status(200).json({ success: true, token });

    } catch (error) {
        res.status(500).json({success: false,message: 'Server error' });
    }
};