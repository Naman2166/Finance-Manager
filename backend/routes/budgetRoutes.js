import express from 'express'
import {getBudgets, addBudget, updateBudget, deleteBudget} from '../controllers/budgetController.js'
import { protect } from '../middleware/authMiddleware.js'


const router = express.Router();
      

// GET all budgets
router.get('/get-budgets', protect, getBudgets);

// POST add a new budget
router.post('/add-budget', protect, addBudget);

// PUT update a budget (by category)
router.put('/:category', protect, updateBudget);      //here we are sending put request

// DELETE a budget (by category)
router.delete('/:category', protect, deleteBudget);     //here we are sending delete request



export default router