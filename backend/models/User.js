import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
},
{
    timestamps: true,
});



//Hash(ie encrypt) password before saving
userSchema.pre('save', async function (next) {          // pre('save', ...) is a middleware that runs before the saving a document (ie User.save() )
    if (!this.isModified('password')) {                // if the password is not modified, skip the middleware
        return next(); 
    }
    this.password = await bcrypt.hash(this.password, 10);          // 'this' refers to the current document(ie user)     
    next();                                                       
});



//Compare password with hashed password
userSchema.methods.comparePassword = async function (userEnteredPassword) {          // userSchema.methods => lets you define custom functions on every user document ,  here we are adding a custom function called "comparePassword" to every user document. (ie now ,we can directly compare user entered password using "user.comparePassword('abcdef')" )
    return await bcrypt.compare(userEnteredPassword, this.password); 
                 
}




export default mongoose.model('User', userSchema);


