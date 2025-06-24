//time: 25 min 12 sec

import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { useBudget } from '../../context/BudgetContext';




const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const { fetchBudgets } = useBudget();

  const navigate = useNavigate();


  //handle login Submit
  const handleLogin = async (e) => {
    e.preventDefault();
    
    if(!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    if(!password) {
      setError('Please enter your password');
      return;
    }

    setError("");
    


    //Login API Call
    try {
      const response = await axiosInstance.post(API_PATH.AUTH.LOGIN, { email, password });              //defined in apiPath.js & axiosInstance.js
      const {token, user} = response.data;

      if(token) {
      localStorage.setItem('token', token);
      updateUser(user);                       //defined in UserContext.jsx      //this is used to update the user data in the context
      await fetchBudgets();                   
      navigate('/dashboard');
      }

    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message);
      }
      else {
        setError('Something went wrong. Please try again later.');
      }
    }

  }




  return (
    <AuthLayout>
       <div className='lg:w-[65%] h-3/4 md:h-full flex flex-col justify-center lg:-mt-6'>
        <h3 className='text-xl font-semibold text-black'> Welcome Back </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'> Please enter your details to Login </p>
       
       
       <form onSubmit={handleLogin}>
        <Input type="text" placeholder='john@example.com' value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" className='w-full border-2 border-gray-300 rounded-md p-2' />          {/* this is the input component*/}
        <Input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} label="Password" className='w-full border-2 border-gray-300 rounded-md p-2' />                    
         
        {error && <p className='text-red-500 text-xs pb-2.5'> {error} </p>}

        <button type='submit' className='w-full bg-primary text-white px-4 py-3 rounded-md mt-4 cursor-pointer hover:bg-purple-600 hover:shadow-lg  transition-all ease-in-out duration-200'> Login </button>

        <p className='text-sm text-slate-800 mt-4'> Don't have an account? {" "}
          <Link to='/signup' className="text-primary font-medium underline" > Signup </Link>
        </p>

       </form>
       
       </div>
    </AuthLayout>
  )

}

export default Login