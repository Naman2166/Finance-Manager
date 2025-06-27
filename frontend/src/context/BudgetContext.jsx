import React, { createContext, useContext, useState, useEffect } from "react";
import { API_PATH } from "../utils/apiPath";
import axiosInstance from "../utils/axiosInstance";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch budgets from backend on mount
  // useEffect(() => {
  //   fetchBudgets();
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchBudgets();
    }
  }, []);
  


  

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(API_PATH.BUDGET.GET_ALL_BUDGETS);
      // console.log(res)
      setBudgets(Array.isArray(res.data) ? res.data : []);
    } 
    catch (err) {
      setBudgets([]);
      console.log("Error fetching budget", err.message)
    } 
    finally {
      setLoading(false);
    }
  };

  
  // Add a new budget category
  const addBudget = async (category, budget) => {
    try {
      const res = await axiosInstance.post( API_PATH.BUDGET.ADD_BUDGET,
        { category, budget, expense: 0 },
      );
      setBudgets((prev) => [...prev, res.data]);
    } catch (err) {
      console.log("Error adding budget", err.message)
    }
  };


  // Delete a budget category
  const deleteBudget = async (category) => {
    try {
      const res = await axiosInstance.delete(API_PATH.BUDGET.DELETE_BUDGET(category));
      // console.log(res)
      setBudgets((prev) => prev.filter((b) => b.category !== category));
    } catch (err) {
      console.log("Error deleting budget", err.message)
    }
  };


  // Update a budget (e.g., when adding expense)
  const updateBudget = async (category, updates) => {
    try {
      const res = await axiosInstance.put(API_PATH.BUDGET.UPDATE_BUDGET(category) , updates);
      setBudgets((prev) =>
        prev.map((b) =>
          b.category === category ? res.data : b
        )
      );
    } catch (err) {
      console.log("Error Updating budget", err.message)
    }
  };


  // Add expense to a category (only if it exists)
  const addExpenseToCategory = async (category, amount) => {
    const found = budgets.find(
      (b) => b.category.toLowerCase() === category.toLowerCase()
    );
    if (!found) return;
    const newExpense = Number(found.expense) + Number(amount);
    await updateBudget(category, { budget: found.budget, expense: newExpense });
  };

  // Remove expense from a category (only if it exists)
  const removeExpenseFromCategory = async (category, amount) => {
    const found = budgets.find(
      (b) => b.category.toLowerCase() === category.toLowerCase()
    );
    if (!found) return;
    const newExpense = Number(found.expense) - Number(amount);
    await updateBudget(category, { budget: found.budget, expense: newExpense });
  };

 
  return (
    <BudgetContext.Provider
      value={{
        budgets,
        loading,
        addBudget,
        deleteBudget,
        addExpenseToCategory,
        removeExpenseFromCategory,
        fetchBudgets,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext); 