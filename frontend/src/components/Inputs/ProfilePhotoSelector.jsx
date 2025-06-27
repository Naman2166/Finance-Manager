import React, { useRef, useState, useEffect } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePhotoSelector = ({ image, setImage, onDeleteImageFromServer }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    // If image is a string => assume it's a URL from DB
    if (typeof image === 'string') {
      setPreviewUrl(image);
    }
    // If image is a File => generate object URL for preview
    else if (image instanceof File) {
      const url = URL.createObjectURL(image);
      setPreviewUrl(url);

      // Cleanup to avoid memory leak
      return () => URL.revokeObjectURL(url);
    }
    // No image
    else {
      setPreviewUrl(null);
    }
  }, [image]);

  // When user selects a file
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const preview = URL.createObjectURL(file);
      setPreviewUrl(preview);
    }
  };

  // When user clicks trash icon
  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    // Optional: if delete API should be triggered
    if (onDeleteImageFromServer) {
      onDeleteImageFromServer();
    }
  };

  // Open file chooser
  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className='flex justify-center mb-6'>
      <input
        type="file"
        ref={inputRef}
        accept='image/*'
        onChange={handleImageChange}
        className='hidden'
      />

      {!previewUrl ? (
        <div className='w-20 h-20 rounded-full bg-purple-100 hover:bg-purple-200 transition-all duration-300 flex items-center justify-center relative'>
          <button type='button' onClick={onChooseFile}>
            <LuUser className='text-primary text-4xl' />
          </button>
          <button
            type='button'
            onClick={onChooseFile}
            className='w-7 h-7 bg-primary text-white cursor-pointer rounded-full flex items-center justify-center absolute -bottom-1 -right-1'
          >
            <LuUpload className='text-xl' />
          </button>
        </div>
      ) : (
        <div className='relative'>
          <img
            src={previewUrl}
            alt='profile photo'
            className='w-20 h-20 rounded-full object-cover'
          />
          <button
            type='button'
            onClick={handleRemoveImage}
            className='w-7 h-7 bg-red-500 text-white cursor-pointer rounded-full flex items-center justify-center absolute -bottom-1 -right-1'
          >
            <LuTrash className='text-xl' />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
