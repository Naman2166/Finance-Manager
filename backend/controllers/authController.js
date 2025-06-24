//time : 1 hr 8 min

import jwt from 'jsonwebtoken';
import User from '../models/User.js';


//Generate JWT token
const generateToken = (res, id) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
}


//Register a new user
const registerUser = async (req, res) => {  

    try {
        const { fullName, email, password, profileImageUrl } = req.body;

        //Validation : Check for missing fields
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });      // 400 => Bad Request
        }

        //Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        //Create new user
        const user = await User.create({ fullName, email, password, profileImageUrl });


        //sending response
        res.status(201).json({ id: user._id, user, token: generateToken(res, user._id) })            // here 'user' contains all the data of the user(id, fullName, email, password, profileImageUrl)

    }
    catch (error) {
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
}





//Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        //Validation : Check for missing fields
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        //Check for user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        //sending response
        res.status(200).json({ id: user._id, user, token: generateToken(res, user._id) })
        
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
}





//Get User information
const getUserInfo = async (req, res) => {
    try {
        const { id } = req.user;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting user info', error: error.message });
    }
}




//Upload Image
const uploadImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }
        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;       //This gives a full public URL that your frontend or browser can use. (eg http://localhost:3000/uploads/abc123.jpg )
        res.status(200).json({ message: 'Image uploaded successfully', imageUrl });
    }
    catch (error) {
        res.status(500).json({ message: 'Error uploading image', error: error.message });
    }
}





export { registerUser, loginUser, getUserInfo, uploadImage };