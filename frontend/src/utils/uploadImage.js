import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

//  Default export function
const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile); // attach file

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // important for file upload
        },
      }
    );
    return response.data; // return API response
  } catch (error) {
    console.error('Error uploading the image:', error);
    throw error;
  }
};

export default uploadImage;
