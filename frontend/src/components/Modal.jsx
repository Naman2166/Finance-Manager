import React from 'react'

const Modal = ({isOpen, onClose, title, children}) => {

  if(!isOpen) return null;

  return (
    <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/30 bg-opacity-50'>

        <div className='relative p-4 w-full max-w-2xl max-h-full'>
            {/* Modal Content */}
            <div className='relative bg-white rounded-lg shadow-sm '>

                {/* Modal Header */}
                 <div className='flex justify-between items-center p-4 md:p-6 border-b rounded-t border-gray-200 '>
                    <h3 className='text-lg font-medium text-gray-900'>
                        {title}
                    </h3>
                    <button onClick={onClose} type='button' className='text-gray-500 font-bold bg-transparent scale-105 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-lg w-10 h-8 inline-flex justify-center items-center cursor-pointer'>
                        X
                    </button>
                 </div>

                {/* Modal Body */}
                <div className='p-4 md:p-6 space-y-4'>
                    {children}
                </div>

            </div> 
        </div>

    </div>
  )
}

export default Modal