import React from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'
import { useState } from 'react'
import Logo from '../../assets/images/FinMateLogo.png'


const Navbar = ({activeMenu}) => {

  const [openSideMenu, setOpenSideMenu] = useState(false)

  return (
    <div className='flex gap-5 bg-gray-900 border-b-2 border-gray-600  py-2 px-7 sticky top-0 z-30'>
         <button onClick={() => setOpenSideMenu(!openSideMenu)} className='block lg:hidden text-black'>
            {openSideMenu ? 
            <HiOutlineX className='text-2xl' /> 
            : 
            <HiOutlineMenu className='text-2xl' />
            }
         </button>

         {/* <h2 className='text-lg font-medium text-black'>FINANCE MANAGER</h2> */}
         <img src={Logo} className='w-40 h-11 '  alt='FinMate'/>  

         {openSideMenu && (
            <div className='fixed top-[61px] -ml-4 bg-white'>
            <SideMenu activeMenu={activeMenu} />
            </div>
         )}
    </div>
  )
}

export default Navbar