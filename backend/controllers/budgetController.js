import Budget from '../models/Budget.js'



// Get all budgets for the logged-in user
const getBudgets = async (req, res) => {
  try {
    const { id } = req.user;
    const budgets = await Budget.find({ user: id });
    res.status(200).json(budgets);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Add a new budget category
const  addBudget = async (req, res) => {
  try {
    const { id } = req.user;
    const { category, budget, expense } = req.body;
    const newBudget = new Budget({
      user: id,
      category,
      budget,
      expense: expense || 0
    });
    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
 


// Update a budget (e.g., update expense or budget amount)
const updateBudget = async (req, res) => {
  try {
    const { id } = req.user;
    const { category } = req.params;
    const { budget, expense } = req.body;
    const updated = await Budget.findOneAndUpdate(
      { user: id, category },
      { $set: { budget, expense } },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Budget not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};



// Delete a budget category
const deleteBudget = async (req, res) => {
  try {
    const { id } = req.user;
    const { category } = req.params;
    const deleted = await Budget.findOneAndDelete({ user: id, category });
    if (!deleted) return res.status(404).json({ error: 'Budget not found' });
    res.json({ message: 'Budget deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error : error.message });
  }
}; 




export {getBudgets, addBudget, updateBudget, deleteBudget }