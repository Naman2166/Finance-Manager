//to run Frontend and Backend : npm run dev
//to open AIchat : ctrl + l
//to select AI suggested code : Tab
//Hide Sidebar : ctrl + B


import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import Home from './pages/Dashboard/Home'
import Income from './pages/Dashboard/Income'
import Expense from './pages/Dashboard/Expense'
import { UserProvider } from './context/UserContext'
import { Toaster } from 'react-hot-toast'
import AllTransactions from './pages/Dashboard/AllTransactions'
import AiAdvisor from './pages/Dashboard/AiAdvisor'
import Budget from './pages/Dashboard/Budget'
import { BudgetProvider } from './context/BudgetContext'


const App = () => {
  return (
    <UserProvider>
      <BudgetProvider>
        <div>
          <Router>
            <Routes>
              <Route path='/' element={<Root />} />            //Root component is defined below (it checks if token exist in local storage or not)
              <Route path='/login' element={<Login />} />
              <Route path='/signUp' element={<SignUp />} />
              <Route path='/dashboard' element={<Home />} />
              <Route path='/income' element={<Income />} />
              <Route path='/expense' element={<Expense />} />
              <Route path='/all-transactions' element={<AllTransactions />} />
              <Route path='/ai-advisor' element={<AiAdvisor />} />
              <Route path='/budget' element={<Budget />} />
            </Routes>
          </Router>
        </div>
        <Toaster 
          toastOptions={{
            className: "bg-white text-black border border-gray-200",
            style: {
              fontSize: "13px",
            }
          }}
        />
      </BudgetProvider>
    </UserProvider>
  )
}

export default App






//Root Component

const Root = () => {

  //Check if token exist in local storage
  const token = localStorage.getItem('token')

  //If token exist, redirect to dashboard, otherwise to Login Page
  if (token) {
    return <Navigate to='/dashboard' />
  }
  return <Navigate to='/login' />
}
