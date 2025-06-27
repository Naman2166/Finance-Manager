import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaCog, FaTrashAlt } from 'react-icons/fa';
import { LuUpload } from 'react-icons/lu';
import { SIDE_MENU_DATA } from '../../utils/data';
import { UserContext } from '../../context/UserContext';
import { uploadImage } from '../../utils/uploadImage';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATH } from '../../utils/apiPath';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser, updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const fileInputRef = useRef(null);
  const settingsRef = useRef(null);

  const handleClick = (route) => {
    if (route === 'logout') return handleLogout();
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  const toggleSettings = () => {
    setShowSettings((prev) => !prev);
    setFullName(user?.fullName || '');
    setEmail(user?.email || '');
    setPassword('');
    setProfilePic(null);
    setPreviewUrl(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleDeleteProfileImage = async () => {
    try {
      await axiosInstance.delete(API_PATH.IMAGE.DELETE_IMAGE);
      updateUser({ ...user, profileImageUrl: '' });
      setProfilePic(null);
      setPreviewUrl(null);
    } catch (err) {
      console.error('Failed to delete image:', err);
    }
  };

  const handleSaveProfile = async () => {
    try {
      let profileImageUrl = user?.profileImageUrl;

      if (profilePic) {
        const uploadRes = await uploadImage(profilePic);
        profileImageUrl = encodeURI(uploadRes.imageUrl || '');
      }

      const updatedData = {
        fullName,
        email,
        password,
        profileImageUrl,
      };

      const response = await axiosInstance.put(API_PATH.AUTH.UPDATE_PROFILE, updatedData);
      updateUser(response.data.user);
      setShowSettings(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='relative w-64 h-[calc(100vh-61px)] text-gray-200 bg-gray-900 p-5 sticky top-[61px] z-20'>

      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7'>
        {user?.profileImageUrl ? (
          <img src={user?.profileImageUrl} alt="profile" className='w-20 h-20 bg-slate-400 rounded-full object-cover' />
        ) : (
          <FaUserCircle className='w-10 h-10 bg-slate-100 text-black rounded-full' />
        )}

        <div className='flex flex-row items-center relative'>
          <h5 className='text-gray-100 font-medium leading-6'>{user?.fullName || ''}</h5>
          <FaCog
            onClick={toggleSettings}
            className='absolute right-[-30px] text-lg text-gray-400 hover:text-white cursor-pointer'
          />

          {showSettings && (
            <div
              ref={settingsRef}
              className='absolute left-46 -top-16 w-72 bg-white text-black shadow-lg rounded-lg p-4 z-50'
            >
              <h4 className='text-md font-semibold mb-2'>Edit Profile</h4>

              {/* Profile Image Preview + Delete */}
              <div className='flex items-center justify-center relative mb-3'>
                {previewUrl || user?.profileImageUrl ? (
                  <img
                    src={previewUrl || user?.profileImageUrl}
                    alt="preview"
                    className='w-20 h-20 rounded-full object-cover'
                  />
                ) : (
                  <div className='w-20 h-20 rounded-full bg-purple-200 flex items-center justify-center'>
                    <FaUserCircle className='text-4xl text-primary' />
                  </div>
                )}

                {/* Upload Icon */}
                <button
                  onClick={() => fileInputRef.current.click()}
                  className='absolute -bottom-1 right-15 cursor-pointer bg-purple-400 hover:bg-purple-500 text-white w-7 h-7 rounded-full flex items-center justify-center'
                >
                  <LuUpload />
                </button>

                {/* Delete Icon (Only if user image exists) */}
                {(previewUrl || user?.profileImageUrl) && (
                  <button
                    onClick={handleDeleteProfileImage}
                    className='absolute -bottom-1 left-15 cursor-pointer bg-red-400 hover:bg-red-500 text-white w-7 h-7 rounded-full flex items-center justify-center'
                  >
                    <FaTrashAlt className='text-sm' />
                  </button>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept='image/*'
                className='hidden'
                onChange={handleImageChange}
              />

              <input
                type="text"
                className="w-full border p-2 rounded mt-2 text-sm"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                className="w-full border p-2 rounded mt-2 text-sm"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="w-full border p-2 rounded mt-2 text-sm"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                className="w-full bg-primary text-white py-2 rounded mt-3 hover:bg-purple-600 transition-all"
                onClick={handleSaveProfile}
              >
                Save
              </button>
            </div>
          )}
        </div>

        <hr className='text-gray-400 w-full my-0.5' />
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={`menu_${index}`}
          onClick={() => handleClick(item.path)}
          className={`w-full flex items-center gap-4 text-[15px] px-6 py-3 rounded-lg mb-3 cursor-pointer ${
            activeMenu === item.label ? 'bg-primary text-black font-semibold' : ''
          }`}
        >
          <item.icon className='text-xl' />
          {item.label}
        </button>
      ))}

      <div
        onClick={handleLogout}
        className='absolute bottom-10 w-2/3 flex justify-center items-center mx-5 py-1 rounded-lg cursor-pointer text-black font-medium bg-gray-400 hover:bg-gray-300 hover:font-semibold'
      >
        Log Out
      </div>
    </div>
  );
};

export default SideMenu;
