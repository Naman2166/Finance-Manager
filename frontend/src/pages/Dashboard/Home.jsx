import React from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATH } from '../../utils/apiPath'
import { useState, useEffect } from 'react'
import { addThousandsSeparator } from '../../utils/helper'
import { IoMdCard } from 'react-icons/io'
import InfoCard from '../../components/Cards/InfoCard'
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'
import RecentTransactions from '../../components/Dashboard/RecentTransactions'
import FinanceOverview from '../../components/Dashboard/FinanceOverview'
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions'
import Last30DaysExpenses from '../../components/Dashboard/Last30DaysExpenses'
// import RecentIncomeWithChart from '../../components/Dashboard/RecentIncomeWithChart'
import RecentIncome from '../../components/Dashboard/RecentIncome'
import Last60DaysIncome from '../../components/Dashboard/Last60DaysIncome'





const Home = () => {

  useUserAuth();

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [Loading, setLoading] = useState(false);


  const fetchDashboardData = async () => {
    if (Loading) return;

    setLoading(true);

    try {
      const response = await axiosInstance.get(`${API_PATH.DASHBOARD.GET_DASHBOARD_DATA}`)            //defined in apiPath.js
      if (response.data) {
        setDashboardData(response.data);
        // console.log("dashboardData :- ", response.data);
      }
    }
    catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
    finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchDashboardData();
  }, []);



  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto ' >
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6'>

          <InfoCard
            icon={<IoMdCard />}
            label="Available Balance"
            value={addThousandsSeparator(dashboardData?.totalBalance || 0)}           //defined in helper.js
            color="bg-primary"
          />

          <InfoCard
            icon={<LuWalletMinimal />}
            label="Total Income"
            value={addThousandsSeparator(dashboardData?.totalIncome || 0)}           //defined in helper.js
            color="bg-orange-500"
          />

          <InfoCard
            icon={<LuHandCoins />}
            label="Total Expense"
            value={addThousandsSeparator(dashboardData?.totalExpense || 0)}           //defined in helper.js
            color="bg-red-500"
          />

        </div>



        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={() => navigate('/all-transactions')}
          />

          <FinanceOverview
            totalBalance={dashboardData?.totalBalance || 0}
            totalIncome={dashboardData?.totalIncome || 0}
            totalExpense={dashboardData?.totalExpense || 0}
          />


          <Last30DaysExpenses
            data={dashboardData?.last30DaysExpenses?.transactions || []}
          />

          <Last60DaysIncome
            data={dashboardData?.last60DaysIncome?.transactions || []}
          />

          {/* <RecentIncomeWithChart
            data={dashboardData?.last60DaysIncome?.transactions?.slice(0, 4) || []}
            totalIncome={dashboardData?.totalIncome || 0}
          /> */}

          <ExpenseTransactions
            transactions={dashboardData?.last30DaysExpenses?.transactions || []}
            onSeeMore={() => navigate('/expense')}
          />

          <RecentIncome
            transactions={dashboardData?.last60DaysIncome?.transactions || []}
            onSeeMore={() => navigate('/income')}
          />

        </div>

      </div>
    </DashboardLayout>
  )
}

export default Home