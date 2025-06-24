import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview'
import { API_PATH } from '../../utils/apiPath'
import { useState, useEffect } from 'react'
import axiosInstance from '../../utils/axiosInstance'
import Modal from '../../components/Modal'
import AddIncomeForm from '../../components/Income/AddIncomeForm'
import { toast } from 'react-hot-toast'
import IncomeList from '../../components/Income/IncomeList'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'




const Income = () => {

  useUserAuth();

  const [incomeData, setIncomeData] = useState([])       
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  })
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false)
  
  
  //Get All Income Details
  const fetchIncomeDetails = async () => {
    try {
      setLoading(true)

      const response = await axiosInstance.get(`${API_PATH.INCOME.GET_ALL_INCOME}`)
      if(response.data){
        setIncomeData(response.data)
        // console.log("Income Data", response.data)
      }
    } 
    catch (error) {
      console.log("Something went wrong, Please try again", error)
    } finally {
      setLoading(false)
    }
  }



  //Handle Add Income
  const handleAddIncome = async (income) => {
    try {
      const {source, amount, date, icon} = income

      //Validation ChecK
      if(!source.trim()){
        toast.error("Source is required")
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
      await axiosInstance.post(API_PATH.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      })

      setOpenAddIncomeModal(false)
      toast.success("Income added successfully")
      fetchIncomeDetails()

    }
    catch (error) {
      console.log("Error adding Income", error.response?.data?.message || error.message)
    } 
  }




  //Delete Income
  const deleteIncome = async (id) => {
    try{
      await axiosInstance.delete(API_PATH.INCOME.DELETE_INCOME(id))

      setOpenDeleteAlert({show:false, data:null})
      toast.success("Income details deleted succesfully")
      fetchIncomeDetails();
    }
    catch(error){
      console.log("Error deleting income", error.response?.data?.message || error.message)
    }
  }




  //handle download income details
  const handleDownloadIncomeDetails = async () => {
    try{
      const response = await axiosInstance.get(API_PATH.INCOME.DOWNLOAD_INCOME, {responseType:"blob"})

      //Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "income_details.xlsx")
      document.body.appendChild(link)
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url)
    }
    catch(error){
      console.log("Error Downloading income deatils",error)
      toast.error("Failed to download income details. pLease try again")
    }
  }



  useEffect(() => {
    fetchIncomeDetails()
  }, [])


  return (
    <DashboardLayout activeMenu="Income">            {/* defined in /components/layouts/DashboardLayout.jsx */}
      <div className='my-5 mx-auto'>

        <div className='grid grid-cols-1 gap-6'>
          <div>
            <IncomeOverview                  //defined in /components/Income/IncomeOverview.jsx
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList                   //defined in /components/Income/IncomeList.jsx
            transactions={incomeData}
            onDelete={(id) => setOpenDeleteAlert({show: true, data: id})}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>


        <Modal                                   //defined in /components/Modal.jsx    //it is the box that will open when the user clicks on the add income button
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />             {/* defined in /components/Income/AddIncomeForm.jsx */}
        </Modal>


        <Modal 
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({show: false, data: null})}
          title="Delete Income"
        >
          <DeleteAlert
           content="Are you sure you want to delete this income?"  
           onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>


      </div>
    </DashboardLayout>

  )
}

export default Income
