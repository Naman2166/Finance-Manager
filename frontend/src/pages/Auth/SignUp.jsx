import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';
import { UserContext } from '../../context/UserContext';
import { useContext } from 'react';
import { uploadImage } from '../../utils/uploadImage';


const SignUp = () => {

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState(null);


  const { updateUser } = useContext(UserContext)
  const navigate = useNavigate();


  //handle Sign Up Form submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter a valid name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Please enter the password");
      return;
    }

    setError("");


    //Sign Up API Call
    try {

      //upload profile picture if present
      if(profilePic){
        const imgUploadResponse = await uploadImage(profilePic);           //defined in uploadImage.js
        profileImageUrl = imgUploadResponse.imageUrl || "";
      }

      //Send the data to the backend
      const response = await axiosInstance.post(API_PATH.AUTH.REGISTER, { fullName, email, password, profileImageUrl });           //defined in apiPath.js & axiosInstance.js

      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    }
    catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }

  }





  return (
    <AuthLayout>
      <div className=' lg:w-[67%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center lg:scale-90 lg:-ml-6 lg:-mt-2  '>
        <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join us today by entering your details below
        </p>

        <form onSubmit={handleSignUp}>

          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className='grid grid-cols-1 md:grid-cols-1 gap-4'>
            <Input type="text" placeholder='Full Name' value={fullName} onChange={(e) => setFullName(e.target.value)} label="Full Name" className='' />
            <Input type="text" placeholder='john@example.com' value={email} onChange={(e) => setEmail(e.target.value)} label="Email Address" className='w-full border-2 border-gray-300 rounded-md p-2' />          {/* this is the input component*/}
            <Input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} label="Password" className='w-full border-2 border-gray-300 rounded-md p-2' />
          </div>


          {error && <p className='text-red-500 text-xs pb-2.5'> {error} </p>}

          <button type='submit' className='w-full bg-primary text-white px-4 py-3 rounded-md mt-4 cursor-pointer hover:bg-purple-600 hover:shadow-lg  transition-all ease-in-out duration-200'> SIGN UP </button>

          <p className='text-sm text-slate-800 mt-4'> Already have an account? {" "}
            <Link to='/login' className="text-primary font-medium underline" > Login </Link>
          </p>



        </form>

      </div>
    </AuthLayout>
  )
}

export default SignUp