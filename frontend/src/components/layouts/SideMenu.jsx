import React from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa';
// import { CgProfile } from 'react-icons/cg';


const SideMenu = ({activeMenu}) => {
 
  const {user, clearUser} = useContext(UserContext)

  const navigate = useNavigate()

  const handleClick = (route) => {
    if(route === 'logout') {
      handleLogout()
      return;
    }
    navigate(route);
  }

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  }



  return (
    <div className='relative w-64 h-[calc(100vh-61px)] text-gray-200 bg-gray-900 p-5 sticky top-[61px] z-20'>

        <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
          {/* {console.log(user)} */}
          {user?.profileImageUrl  ? 
          <img src={user?.profileImageUrl || ''}  alt="profile Image" className='w-20 h-20 bg-slate-400 rounded-full' />
          :
          <>
          <FaUserCircle color="#000000" className='w-10 h-10 bg-slate-100  rounded-full' />            {/* color:#dddddd for lighter gray  */}
          </>
          }

          <h5 className='text-gray-100 font-medium leading-6'> {user?.fullName || ''} </h5>
          <hr className='text-gray-400 w-full my-0.5'/>
        </div>

        
        {SIDE_MENU_DATA.map((item, index) => (
            <button key={`menu_${index}`} onClick={() => handleClick(item.path)} className={`w-full flex items-center gap-4 text-[15px] px-6 py-3 rounded-lg mb-3 cursor-pointer ${activeMenu == item.label ? 'bg-primary text-black font-semibold' : ''}`}>
              <item.icon className='text-xl' />
              {item.label}
            </button>
        ))}

        {/* Log Out button */}
        <div onClick={()=>handleLogout()} className='absolute bottom-10 w-2/3 flex justify-center items-center mx-5 py-1 rounded-lg cursor-pointer text-black font-medium bg-gray-400 hover:bg-gray-300  hover:font-semisbold'>
          Log Out
        </div>
         
    </div>
  )
}

export default SideMenu