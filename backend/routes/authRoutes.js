import express from 'express';
import { registerUser, loginUser, getUserInfo } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';
import { uploadImage } from '../controllers/authController.js';


const router = express.Router();

router.post('/register', registerUser);            //All functions defined in authController.js
router.post('/login', loginUser);
router.get('/getUser', protect, getUserInfo);      //protect => middleware defined in authMiddleware.js

router.post('/upload-image', upload.single('image'), uploadImage);


export default router;
