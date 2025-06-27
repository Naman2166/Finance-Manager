import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className='flex gap-6 bg-gray-900 p-6 rounded-2xl cursor-default'>
        <div className={`w-14 h-14 text-white text-[26px] flex items-center justify-center rounded-full drop-shadow-xl ${color}`}>
          {icon}
        </div>
        <div>
            <h6 className='text-sm text-gray-100 mb-1'>{label}</h6>
            <span className='text-[22px] text-gray-100 font-semibold'>${value}</span>
        </div>
    </div>
  )
}

export default InfoCard