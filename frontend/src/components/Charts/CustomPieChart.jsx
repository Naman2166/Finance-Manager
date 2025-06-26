import React from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import CustomTooltip from './CustomTooltip'
import CustomLegend from './CustomLegend'


const CustomPieChart = ({data, label, totalAmount, colors, showTextAnchor}) => {

  return (
    <ResponsiveContainer width="100%" height={380} >
        <PieChart>

            <Pie
                data={data}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Pie>     

            <Tooltip content={<CustomTooltip />} />         {/* defined in CustomTooltip.jsx */}  {/* tooltip is the small box that appears when you hover over a slice of the pie chart */}
            <Legend content={<CustomLegend />} />          {/* defined in CustomLegend.jsx */}  {/* legend is the small squares in the pie chart that show the percentage of each category */}

            {showTextAnchor && (
                <g>                 {/* g is grouping element */}
                 <text    
                   x="50%"
                   y="50%"
                   dy={-25}
                   textAnchor="middle"
                   fill="#ccc4c2"
                   fontSize="14px"
                 >
                    {/* label is the text that appears in the center of the pie chart */}
                    {label}
                 </text>
                 <text 
                   x="50%"
                   y="50%"
                   dy={8}
                   textAnchor="middle"
                   fill="#fff"
                   fontSize="24px"
                   fontWeight="semibold"
                 >
                    {totalAmount}
                 </text>
                </g>
            )}

        </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart