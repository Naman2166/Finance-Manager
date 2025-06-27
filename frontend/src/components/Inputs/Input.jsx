import React from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';
import { useState } from 'react';


const Input = ({type, placeholder, value, onChange, label}) => {
  
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
  
  return (
    <div>
      <label className='text-sm text-slate-300'>{label}</label>

      <div className='input-box'>
        <input type={type == 'password' ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent outline-none ${ type === 'date' ? 'date-input' : '' }` }
        />

        {type === "password" && (
          <>
            {showPassword ? 
            (
              <FaRegEye size={22} onClick={()=> toggleShowPassword()} className='text-primary cursor-pointer' />
            ) : 
            (
              <FaRegEyeSlash size={22} onClick={()=> toggleShowPassword()} className='text-slate-600 cursor-pointer' />
            )}
          </>
        )}
        
      </div>
    </div>
  )
}

export default Input