import mongoose from 'mongoose';


//Income Schema
const IncomeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  icon : { type: String },
  source: { type: String, required: true },      //example : salary, business, Freelancing, etc.
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
},
{ 
    timestamps: true 
});


//Income Model
const Income = mongoose.model('Income', IncomeSchema);


export default Income;
