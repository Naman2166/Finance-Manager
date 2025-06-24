import express from 'express';
import { addExpense, getAllExpense, deleteExpense, downloadExpenseExcel } from '../controllers/expenseController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/add-expense', protect, addExpense);              //protect => middleware defined in authMiddleware.js   
router.get('/get-all-expense', protect, getAllExpense);         //All functions defined in expenseController.js
router.delete('/delete-expense/:expenseId', protect, deleteExpense);
router.get('/download-expense-excel', protect, downloadExpenseExcel);


export default router;


