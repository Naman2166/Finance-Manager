import Income from '../models/Income.js';
import Expense from '../models/Expense.js';
import { isValidObjectId, Types } from 'mongoose';


//Dashboard Data
const getDashboardData = async (req, res) => {
    try {
        const {id} = req.user;
        const userObjectId = new Types.ObjectId(String(id));

        //Fetch total income
        const totalIncome = await Income.aggregate([                    // aggregate() => method that apply chain of operations (such as match, group, sort, etc.) to your documents
            {$match: {userId: userObjectId}},                          //This filters the documents and only passes the ones where userId matches the given userObjectId.  (It's similar to a WHERE clause in SQL.)
            {$group: {_id: null, total: {$sum: "$amount"}}},           //This groups the documents by null (ie groups all documents together) and calculates the total sum of the amount field.
        ]);

        // console.log("totalIncome", {totalIncome, userId: isValidObjectId(id)});


        //Fetch total expense
        const totalExpense = await Expense.aggregate([
            {$match: {userId: userObjectId}},
            {$group: {_id: null, total: {$sum: "$amount"}}},
        ]);


        //Get income transactions in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({ 
            userId: id, 
            date: {$gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000)},
        }).sort({date: -1});


        //Get total  income in the last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0                 //reduce() => method that applies a function to each element of the array and returns a single value.
        );


        //Get expense transactions in the last 30 days
        const last30DaysExpenseTransactions = await Expense.find({
            userId: id,
            date: {$gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)},
        }).sort({date: -1});
        

        //Get total expense in the last 30 days
        const expenseLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );


        //Fetch last 5 transactions (income + expense)
        const last5Transactions = [

            ...((await Income.find({userId: id}).sort({date: -1}).limit(5)).map(
                (transaction) => ({
                    ...transaction.toObject(),
                    type: "income",
                })
            )),

            ...((await Expense.find({userId: id}).sort({date: -1}).limit(5)).map(
                (transaction) => ({
                    ...transaction.toObject(),
                    type: "expense",
                })
            )),
        ].sort((a, b) => b.date - a.date);      //Sort by date in descending order
        
        

         //Final response
         res.status(200).json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0) ,
            totalIncome: totalIncome[0]?.total || 0,
            totalExpense: totalExpense[0]?.total || 0,
            last30DaysExpenses:{total: expenseLast30Days, transactions: last30DaysExpenseTransactions},
            last60DaysIncome:{total: incomeLast60Days, transactions: last60DaysIncomeTransactions},
            recentTransactions: last5Transactions,
         });

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}


export { getDashboardData };
