import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'


const ExpenseTransactions = ({transactions, onSeeMore}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg font-medium text-gray-100'>Expenses</h5>
            <button className='card-btn' onClick={onSeeMore}>
                See All <LuArrowRight className="text-base" />
            </button>
        </div>

        <div className='mt-6'>
            {/* {console.log("transactions :- ", transactions)}     */}
            {transactions?.slice(0,4)?.map((expense) => (
                <TransactionInfoCard 
                 key={expense._id} 
                 title={expense.category}
                 icon={expense.icon}
                 amount={expense.amount}
                 type="expense"
                 date={moment(expense.date).format("DD MMM YYYY")}
                 hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default ExpenseTransactions