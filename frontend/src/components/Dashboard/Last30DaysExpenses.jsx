import React from 'react'
import { useState, useEffect } from 'react'
import { prepareExpenseBarCharData } from '../../utils/helper'
import CustomBarChartExpense from '../Charts/CustomBarChartExpense'


const Last30DaysExpenses = ({data}) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpenseBarCharData(data)          // defined in helper.js
        setChartData(result)
    }, [data])

    // console.log("chartData expenses :- ", chartData);

  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Expenses</h5>
        </div>

        <CustomBarChartExpense  data={chartData} />
    </div>
  )
}

export default Last30DaysExpenses