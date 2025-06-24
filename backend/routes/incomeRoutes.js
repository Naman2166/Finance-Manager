import express from 'express';
import { addIncome, getAllIncome, deleteIncome, downloadIncomeExcel } from '../controllers/incomeController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/add-income', protect, addIncome);              //protect => middleware defined in authMiddleware.js   
router.get('/get-all-income', protect, getAllIncome);         //All functions defined in incomeController.js
router.delete('/delete-income/:incomeId', protect, deleteIncome);
router.get('/download-income-excel', protect, downloadIncomeExcel);


export default router;


