import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'


const ExpenseList = ({transactions, onDelete, onDownload}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>All Expenses</h5>

        <button onClick={onDownload} className='flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 whitespace-nowrap bg-purple-100 border border-purple-200 rounded-lg px-4 py-1.5 hover:bg-purple-200 cursor-pointer transition-all duration-300'>
          <LuDownload className='text-base' /> Download
        </button>
      </div>


      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {transactions?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            date={moment(expense.date).format('DD MMM YYYY')}
            amount={expense.amount}
            type='expense'
            onDelete={() => onDelete(expense)}
          />
        ))}
      </div>
    </div>
  )
}

export default ExpenseList