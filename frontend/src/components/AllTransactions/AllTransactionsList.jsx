import React from 'react'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'


const AllTransactionsList = ({transactions, onDelete}) => {
  return (
    <div className='card xl:mr-96 lg:mr-48'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>All Transactions</h5>
      </div>


      <div className='mt-6'>
            {transactions?.map((item)=>(
                <TransactionInfoCard
                    key={item._id}
                    title={item.type === 'expense' ? item.category : item.source}
                    icon={item.icon}
                    amount={item.amount}
                    type={item.type}
                    date={moment(item.date).format('DD MMM YYYY')}
                    hideDeleteBtn
                />
            ))}
        </div>
    </div>
  )
}

export default AllTransactionsList