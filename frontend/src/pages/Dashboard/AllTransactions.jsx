import React, {useEffect, useState} from 'react'
import { useUserAuth } from '../../hooks/useUserAuth'
import DashboardLayout from '../../components/layouts/DashboardLayout';
import {toast} from 'react-hot-toast'
import axiosInstance from '../../utils/axiosInstance'
import Modal from '../../components/Modal';
import { API_PATH } from '../../utils/apiPath'
import DeleteAlert from '../../components/DeleteAlert'
import AllTransactionsList from '../../components/AllTransactions/AllTransactionsList';





const AllTransactions = () => {

  useUserAuth();

  const [allTransactionsData, setAllTransactionsData] = useState([])       
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false)


  
   //Get All Expense Details
   const fetchAllTransactionsDetails = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get(`${API_PATH.DASHBOARD.GET_DASHBOARD_DATA}`)
      if(response.data){
        setAllTransactionsData(response.data)
        // console.log("Income Data", response.data)
      }
    } 
    catch (error) {
      console.log("Something went wrong, Please try again", error)
    } finally {
      setLoading(false)
    }
  }




//   //Delete Expense
//   const deleteExpense = async (id) => {
//     try{
//       await axiosInstance.delete(API_PATH.EXPENSE.DELETE_EXPENSE(id))

//       setOpenDeleteAlert({show:false, data:null})
//       toast.success("Expense details deleted succesfully")
//       fetchAllTransactionsDetails();
//     }
//     catch(error){
//       console.log("Error deleting expense", error.response?.data?.message || error.message)
//     }
//   }




  useEffect(()=>{
    fetchAllTransactionsDetails();
  }, [])


 
  return (
    <DashboardLayout activeMenu="All Transactions">
      <div className='my-5 mx-auto'>

        <div className='grid grid-cols-1 gap-6'>
            <AllTransactionsList
              transactions={allTransactionsData?.recentTransactions}
              onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
            />
        </div>
 

       
        {/* <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Expense"
        >
          <DeleteAlert
           content="Are you sure you want to delete this expense?"  
           onDelete={() => deleteExpense(openDeleteAlert.data)}
          />
        </Modal> */}



      </div>
    </DashboardLayout>
  )
}

export default AllTransactions