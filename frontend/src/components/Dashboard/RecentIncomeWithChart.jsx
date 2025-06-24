import React from 'react'
import { useState, useEffect } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'


const COLORS = ['#875CF5', '#875CF5', '#875CF5', '#4f39f6']

const RecentIncomeWithChart = ({data, totalIncome}) => {

  const [chartData, setChartData] = useState([])

  const prepareChartData = () => {
    const dataArr = data?.map((item) => {
      return {
        name: item?.source,
        amount: item?.amount,
      }
    })
    setChartData(dataArr)
  }

  useEffect(() => {
    prepareChartData();
  }, [data])



  return (
    <div className='card'>

      <div className='flex justify-between items-center'>
        <h5 className='text-lg'>Last 60 days income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
      
       
    </div>
    
  )
}

export default RecentIncomeWithChart