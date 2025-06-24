import Expense from '../models/Expense.js';
import xlsx from 'xlsx';


//Add Expense
const addExpense = async (req, res) => {
    try {
        const { id } = req.user;
        const { icon, category, amount, date } = req.body;

        //Validation : Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        } 

        //Create new expense
        const newExpense = new Expense({ userId: id, icon, category, amount, date: new Date(date) });

        //Save expense to database
        await newExpense.save();

        res.status(200).json({ message: 'Expense added successfully', newExpense });

    }
    catch (error) {
        res.status(500).json({ message: 'Error adding expense', error: error.message });
    }
}





//Get All Expense
const getAllExpense = async (req, res) => {
    try {
        const { id } = req.user;
        const expense = await Expense.find({ userId: id }).sort({ date : -1 });         // .sort({ date: -1 }) => sort the income by date in descending order (ie latest income comes first)
        res.status(200).json(expense);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting all expense', error: error.message });
    }
}




//Delete Expense
const deleteExpense = async (req, res) => {
    try {
        const { expenseId } = req.params;
        await Expense.findByIdAndDelete(expenseId);
        res.status(200).json({ message: 'Expense deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting expense', error: error.message });
    }
}





//Download Expense Excel
const downloadExpenseExcel = async (req, res) => {
    try {
        const { id } = req.user;
        const expense = await Expense.find({ userId: id }).sort({ date : -1 });
        // console.log(expense)

        //Prepare data for excel
        const data = expense.map(item => ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date
        }));

        const wb = xlsx.utils.book_new();                  //book_new => create a new workbook
        const ws = xlsx.utils.json_to_sheet(data);         //json_to_sheet => convert the data to a worksheet
          
        // 💡 Set column widths
        ws['!cols'] = [
            { wch: 10 }, // category
            { wch: 10 }, // amount
            { wch: 13 }  // date
        ]; 
        
        xlsx.utils.book_append_sheet(wb, ws, 'expense');    //book_append_sheet => add the worksheet to the workbook
        xlsx.writeFile(wb, 'expense_details.xlsx');         //writeFile => write the workbook to a file
        res.download('expense_details.xlsx');               //download the file
    }
    catch (error) {
        res.status(500).json({ message: 'Error downloading expense excel', error: error.message });
        // console.log("gadbad h lala")
    }
}





export { addExpense, getAllExpense, deleteExpense, downloadExpenseExcel };


