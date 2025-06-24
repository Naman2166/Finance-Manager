import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];          // This accesses the Authorization header from the incoming HTTP request (ie Authorization : Bearer <token_here> ) and splits from spaces into an array, then takes the second element (index 1) which is the token
        if (!token) {
            return res.status(401).json({ message: 'Not Authorized, no token' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');         // This line is used to find the user by the id stored in the decoded token and then stores returned deatils of a user without the password field in 'req.user' object
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Not Authorized, invalid token' });
    }
}




export { protect };



