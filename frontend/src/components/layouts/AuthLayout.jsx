import React from 'react'
import LoginPageImage from '../../assets/images/LoginPageImage.jpg'
import Logo from '../../assets/images/FinMateLogo.png'

const AuthLayout = ({children}) => {
  return (
    <div className='flex'>

       {/* Left Part*/}
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-7 pb-15'>
            <img src={Logo} alt='Logo' className='w-48 h-14 -ml-5' />
            {/* <h2 className='text-lg font-medium text-black'>Finance Manage</h2> */}
             {children}
             
        </div>

       
       {/* Right Part*/}
        <div className='hidden md:block w-[40vw] h-screen bg-violet-50 bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative'>
            <div className='w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 -left-5 '></div>
            {/* <div className='w-48 h-56 rounded-[40pxs] border-[20px] border-fuchsia-600 absolute -top-[30%] -right-10 '></div> */}
            <div className='w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5 '></div>

            <img src={LoginPageImage} alt='Login Page Image'  className='w-[90%] bottom-[31%] right-[4%] rounded-[20px] lg:w-[90%] absolute lg:bottom-18 shadow-2xl shadow-black'/>
        </div>

    </div>
  )
}

export default AuthLayout