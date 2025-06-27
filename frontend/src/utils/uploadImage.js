import axiosInstance from "./axiosInstance";
import { API_PATH } from "./apiPath";

const uploadImage = async (imageFile) => {
    try{
        const formData = new FormData();
        //Append the image file to the form data
        formData.append("image", imageFile);

        const response = await axiosInstance.post(API_PATH.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data",        //Set header for file upload
            },
        });

        return response.data;
    } 
    catch (error) { 
        console.error("Error uploading image:", error);
        throw error;         //Rethrow error for handling
    }
}

export { uploadImage };