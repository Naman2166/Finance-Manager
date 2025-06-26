import React from 'react'
import EmojiPicker from 'emoji-picker-react'
import {LuImage, LuX} from 'react-icons/lu'
import { useState } from 'react'



const EmojiPickerPopup = ({icon, onSelect}) => {             //used in /components/Income/AddIncomeForm.jsx
  
   const [isOpen, setIsOpen] = useState(false)

    return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
        <div onClick={() => setIsOpen(true)} className='flex items-center gap-4 cursor-pointer'>
            <div className='w-12 h-12 flex items-center justify-center text-2xl bg-gray-200 hover:bg-gray-300 text-primary rounded-full'>
                {icon ? 
                (<img src={icon} alt="icon" className='w-12 h-12' />)
                :
                (<LuImage className='' />)}
            </div>

            <p className='text-gray-800'>{icon ? "Change Icon" : "Select Icon"}</p>
        </div>

        {isOpen && (
            <div className='relative'>
                <button type='button' onClick={() => setIsOpen(false)} className='w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'>
                    <LuX className='w-6 h-6' />
                </button>

                <EmojiPicker           //imported from emoji-picker-react
                  open={isOpen} 
                  onEmojiClick={(emoji) => onSelect(emoji?.imageUrl || "" )}
                />
            </div>
        )}
    </div>
  )
}

export default EmojiPickerPopup