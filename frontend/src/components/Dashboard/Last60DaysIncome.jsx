import React from 'react'
import { useState, useEffect } from 'react'
import { prepareIncomeBarCharData } from '../../utils/helper'
import CustomBarChartIncome from '../Charts/CustomBarChartIncome'


const Last60DaysIncome = ({data}) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarCharData(data)          // defined in helper.js
        setChartData(result)
    }, [data])

    // console.log("chartData income :- ", chartData);

  return (
    <div className='card col-span-1'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Last 30 Days Income</h5>
        </div>

        <CustomBarChartIncome data={chartData} />
    </div>
  )
}

export default Last60DaysIncome