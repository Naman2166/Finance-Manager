import mongoose from 'mongoose';

//Expense Schema
const ExpenseSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    icon: { type: String },
    category: { type: String, required: true },     //example : food, shopping, travel, etc.
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
},
{
    timestamps: true
});


//Expense Model
const Expense = mongoose.model('Expense', ExpenseSchema);

export default Expense;



