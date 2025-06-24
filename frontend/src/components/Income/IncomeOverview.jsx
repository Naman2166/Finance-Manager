import React from 'react'
import {LuPlus} from 'react-icons/lu'
import CustomBarChartIncome from '../Charts/CustomBarChartIncome'
import { useState, useEffect } from 'react'
import { prepareSortedIncomeBarChartData } from '../../utils/helper'


const IncomeOverview = ({ transactions, onAddIncome }) => {

  const [chartData, setChartData] = useState([])

  useEffect(() => {
      const result = prepareSortedIncomeBarChartData(transactions);      // defined in helper.js
      setChartData(result);
  }, [transactions])

  
  return (
    <div className='card'>

        <div className='flex justify-between items-center'>
            <div className=''>
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-sm text-gray-400 mt-0.5'>
                    Track your earning over time and analyze your income trends.
                </p>
            </div>

            <button onClick={onAddIncome} className='add-btn'>
                <LuPlus className='text-lg' />
                Add Income
            </button>
        </div>


        <div className='mt-10'>
            <CustomBarChartIncome data={chartData} />        
        </div>

    </div>
  )
}

export default IncomeOverview