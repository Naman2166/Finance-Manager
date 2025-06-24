import React, {useEffect, useState} from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import {toast} from 'react-hot-toast'
import axiosInstance from '../../utils/axiosInstance'
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import { API_PATH } from '../../utils/apiPath'
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert'
import { useBudget } from '../../context/BudgetContext'






const Expense = () => {

  useUserAuth();

  const [expenseData, setExpenseData] = useState([])       
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const { addExpenseToCategory } = useBudget();
  


  
   //Get All Expense Details
   const fetchExpenseDetails = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get(`${API_PATH.EXPENSE.GET_ALL_EXPENSE}`)
      if(response.data){
        setExpenseData(response.data)
        // console.log("Income Data", response.data)
      }
    } 
    catch (error) {
      console.log("Something went wrong, Please try again", error)
    } finally {
      setLoading(false)
    }
  }




  //Handle Add Expense
  const handleAddExpense = async (expense) => {
    try {
      const {category, amount, date, icon} = expense

      //Validation ChecK
      if(!category.trim()){
        toast.error("Category is required")
        return;
      }

      if(!amount || isNaN(amount) || Number(amount) <= 0){
        toast.error("Amount should be a valid number greater than 0")
        return;
      }

      if(!date){
        toast.error("Date is required")
        return;
      }

      //Add Income
      await axiosInstance.post(API_PATH.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      })
      // Add to budget context
      addExpenseToCategory(category, amount);
      setOpenAddExpenseModal(false)
      toast.success("Expense added successfully")
      fetchExpenseDetails()

    }
    catch (error) {
      console.log("Error adding Income", error.response?.data?.message || error.message)
    } 
  }




  //Delete Expense
  const deleteExpense = async (id) => {
    try{
      await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id))

      setOpenDeleteAlert({show:false, data:null})
      toast.success("Expense details deleted succesfully")
      fetchExpenseDetails();
    }
    catch(error){
      console.log("Error deleting expense", error.response?.data?.message || error.message)
    }
  }




  //handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try{
      const response = await axiosInstance.get(API_PATH.EXPENSE.DOWNLOAD_EXPENSE, {responseType:"blob"})

      //Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "expense_details.xlsx")
      document.body.appendChild(link)
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)
    }
    catch(error){
      console.log("Error Downloading expense deatils",error)
      toast.error("Failed to download expense details. pLease try again")
    }
  }



  useEffect(()=>{
    fetchExpenseDetails();
  }, [])



  return (
    <DashboardLayout activeMenu="Expense">
      <div className='my-5 mx-auto'>

        <div className='grid grid-cols-1 gap-6'>
          <div>
            <ExpenseOverview 
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

            <ExpenseList
              transactions={expenseData}
              onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
              onDownload={handleDownloadExpenseDetails}
            />
        </div>


        <Modal 
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>  

       
        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Expense"
        >
          <DeleteAlert
           content="Are you sure you want to delete this expense?"  
           onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal>



      </div>
    </DashboardLayout>
  )
}

export default Expense