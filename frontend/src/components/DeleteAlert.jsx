import React from 'react'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div>
      <p className='text-sm text-gray-600 font-medium'>{content}</p>

      <div className='flex justify-end mt-6'>
        <button type="button" onClick={onDelete} className='bg-primary text-white px-3 text-md py-1 rounded-md hover:scale-105'>
          Delete
        </button>
      </div>
    </div>
  )
}

export default DeleteAlert