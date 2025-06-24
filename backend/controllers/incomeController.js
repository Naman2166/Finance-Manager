import Income from '../models/Income.js';
import xlsx from 'xlsx';


//Add Income 
const addIncome = async (req, res) => {
    try {
        const { id } = req.user;
        const { icon, source, amount, date } = req.body;

        //Validation : Check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: 'All fields are required' });
        } 

        //Create new income
        const newIncome = new Income({ userId: id, icon, source, amount, date: new Date(date) });

        //Save income to database
        await newIncome.save();

        res.status(200).json({ message: 'Income added successfully', newIncome });

    }
    catch (error) {
        res.status(500).json({ message: 'Error adding income', error: error.message });
    }
}





//Get All Income
const getAllIncome = async (req, res) => {
    try {
        const { id } = req.user;
        const income = await Income.find({ userId: id }).sort({ date : -1 });         // .sort({ date: -1 }) => sort the income by date in descending order (ie latest income comes first)
        res.status(200).json(income);
    }
    catch (error) {
        res.status(500).json({ message: 'Error getting all income', error: error.message });
    }
}




//Delete Income
const deleteIncome = async (req, res) => {
    try {
        const { incomeId } = req.params;
        await Income.findByIdAndDelete(incomeId);
        res.status(200).json({ message: 'Income deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting income', error: error.message });
    }
}





//Download Income Excel
const downloadIncomeExcel = async (req, res) => {
    try {
        const { id } = req.user;
        const income = await Income.find({ userId: id }).sort({ date : -1 });

        //Prepare data for excel
        const data = income.map(item => ({
            Source: item.source,
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
        
        xlsx.utils.book_append_sheet(wb, ws, 'Income');    //book_append_sheet => add the worksheet to the workbook
        xlsx.writeFile(wb, 'income_details.xlsx');         //writeFile => write the workbook to a file
        res.download('income_details.xlsx');               //download the file
    }
    catch (error) {
        res.status(500).json({ message: 'Error downloading income excel', error: error.message });
    }
}





export { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel };


