import React from 'react'
import { LuUtensils, LuTrendingUp, LuTrendingDown,LuTrash2 } from 'react-icons/lu'


const TransactionInfoCard = ({title, icon, amount, type, date, hideDeleteBtn, onDelete}) => {

  const getAmountStyle = () => {
    if(type === "income") {
        return "bg-green-200 text-green-800"
    }
    return "bg-red-200 text-red-700"
  }


  return (
    <div className='group relative flex items-center justify-between gap-4 mt-2 p-3 pr-8 rounded-lg'>
       
        <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
            {icon ? 
              <img src={icon} alt={title} className='w-6 h-6' />
              :
              <LuUtensils /> 
            }
        </div>



        <div className='flex-1 flex items-center justify-between'>
           
           <div>
            <p className='text-sm text-gray-200 font-medium'>{title}</p>
            <p className='text-xs text-gray-400 mt-1'>{date}</p>
           </div>

           <div className='flex items-center gap-2 md:gap-8'>
            {!hideDeleteBtn && (
                <button onClick={onDelete} className='text-gray-400 hover:text-red-500 opacity-100 group-hover:opacity-100 transition-opacity cursor-pointer duration-300'>
                    <LuTrash2 size={21} />
                </button>
            )}
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyle()} `}>
                <h6 className='text-xs font-medium'>
                    {type === "income" ? "+" : "-"} ${amount}
                </h6>
                    {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
            </div>
            </div>

        </div>

    </div>
  )
}

export default TransactionInfoCard