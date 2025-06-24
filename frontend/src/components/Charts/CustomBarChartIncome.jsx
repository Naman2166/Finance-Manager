import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts'



const CustomBarChartIncome = ({data}) => {

//   // define colors for Bars (alternative bars have same color)
//   const getBarColor = (index) => {
//     return index % 2 === 0 ? "#FF8042" : "#FF8042"
//   }

  // define custom tooltip
  const CustomTooltip = ({active, payload}) => {
    if(active && payload && payload.length) {
        return (
            <div className='bg-white p-2 rounded-lg shadow-md border border-gray-300'>
                <p className='text-xs font-semibold text-purple-800 mb-1'>{payload[0].payload.source}</p>
                <p className='text-sm text-gray-600'>
                    Amount: <span className='text-sm font-medium text-gray-900'> ${payload[0].payload.amount} </span>
                </p>
            </div>
        )
    }
  }



  return (
    <div className='bg-white mt-6'>
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>                         {/* BarChart is the main component that displays the bar chart */}
                <CartesianGrid stroke="none" />
                <XAxis dataKey="month" tick={{fontSize: 12, fill: "#555"}} stroke="none" />
                <YAxis tick={{fontSize: 12, fill: "#555"}} stroke="none" />
                <Tooltip content={CustomTooltip} />         {/* tooltip is the small box that appears when you hover over a bar in the bar chart */}
                <Legend />                                  {/*legend is the small squares in the bar chart that show the percentage of each category */}
                <Bar dataKey="amount" fill="#FF8042" radius={[10, 10, 0, 0]} activeDot={{r: 8, fill: "yellow"}} activeStyle={{fill: "green"}}>     
                    {data.map((entry, index) => (
                        <Cell key={index} fill="#32CD32" />        //cell is the small rectangle that appears in the bar chart
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default CustomBarChartIncome 