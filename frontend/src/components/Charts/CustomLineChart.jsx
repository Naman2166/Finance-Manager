import React from 'react'
import {XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area, AreaChart} from "recharts"


const CustomLineChart = ({data}) => {

  // define custom tooltip
  const CustomTooltip = ({active, payload}) => {
    if(active && payload && payload.length) {
        return (
            <div className='bg-white p-2 rounded-lg shadow-md border border-gray-300'>
                <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload.category}</p>
                <p className='text-sm text-gray-600'>
                    Amount: <span className='text-sm font-medium text-gray-900'> ${payload[0].payload.amount} </span>
                </p>
            </div>
        )
    }
    return null;
  }


  return (
    <div className='bg-gray-900'>
        <ResponsiveContainer width="100%" height={300} >
            <AreaChart data={data}>

              <defs>
                <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FEE2E2" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FEE2E2" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid stroke="none" />
              <XAxis  dataKey="month" tick={{fontSize:12, fill:"#999"}} stroke="none" />
              <YAxis  tick={{fontSize:12, fill:"#999"}} stroke="none" />
              <Tooltip content={<CustomTooltip />} />

              <Area type="monotone" dataKey="amount" stroke="#EF4444" fill='url(#incomeGradient)' strokeWidth={3} dot={{r:3, fill:"#ab8df8"}} />

            </AreaChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomLineChart