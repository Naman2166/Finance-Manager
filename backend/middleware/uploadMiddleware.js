import multer from 'multer';


// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {         // cb is a callback function
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})


// Define the file filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {            //mimetype is a type of file
        cb(null, true);                                    // If the file type is allowed, then call the callback function with null (no error) and true (file is allowed)
    } else {
        cb(new Error('Only .jpg, .jpeg and .png files are allowed'), false);        // If the file type is not allowed, then call the callback function with an error and false (file is not allowed)
    }
}


// Initialize Multer with the configured storage and file filter
const upload = multer({ storage, fileFilter });



export { upload };
