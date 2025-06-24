import React from 'react'
import {useRef, useState} from 'react';
import {LuUser, LuUpload, LuTrash} from 'react-icons/lu';


const ProfilePhotoSelector = ({image, setImage}) => {

  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
        //update the image state
        setImage(file);

        //Generate a preview URL from the file
         const preview = URL.createObjectURL(file);
         setPreviewUrl(preview); 

         

    }
  }

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    // Reset the file input value so the same file can be selected again
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  const onChooseFile = () => {
    inputRef.current.click();
  }



  return (
    <div className='flex justify-center mb-6'>
        <input type="file" ref={inputRef} accept='image/*' onChange={handleImageChange} className='hidden' />

    { !image ? 
    (
        <div className='w-20 h-20 rounded-full bg-purple-100 hover:bg-purple-200 transition-all duration-300 flex items-center justify-center relative'>

            <button type='button' onClick={onChooseFile}>
            <LuUser className='text-primary text-4xl' />
            </button>

            <button type='button' onClick={onChooseFile} className='w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center absolute -bottom-1 -right-1'>
                 <LuUpload className='text-xl' /> 
            </button>
        </div>
    ) :
    (
        <div className='relative'>
            <img src={previewUrl} alt='profile photo' className='w-20 h-20 rounded-full object-cover' />

            <button type='button' onClick={handleRemoveImage} className='w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center absolute -bottom-1 -right-1'>
                <LuTrash className='text-xl' />
            </button>
        </div>
    ) }

    </div>
  )
}

export default ProfilePhotoSelector