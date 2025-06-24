import React from 'react'
import { useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import axiosInstance from '../utils/axiosInstance'
import { API_PATH } from '../utils/apiPath'
import { useNavigate } from 'react-router-dom'


 const useUserAuth = () => {

  const {user, updateUser, clearUser} = useContext(UserContext)
  const navigate = useNavigate()


  useEffect(() => {
    if(user) {
      return;
    }

    let isMounted = true;

    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATH.AUTH.GET_USER_INFO)
        if(isMounted && response.data) {
          updateUser(response.data);
          }
      } 
      catch (error) {
        console.log("Error fetching user info", error);
        if(isMounted) {
          clearUser();
          navigate('/login');
        }
      }
    }

    fetchUserInfo();

    return () => {
      isMounted = false;
    }

  }, [updateUser, clearUser, navigate])



  return (
    <div>useUserAuth</div>
  )
}


export { useUserAuth }