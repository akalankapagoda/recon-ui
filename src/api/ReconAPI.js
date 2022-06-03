
import axios from 'axios';

export const uploadFileAPI = async (identifier, file) => {
    
    // Create an object of formData
    const formData = new FormData();
  
    // Update the formData object
    formData.append("file", file);
    formData.append("identifier", identifier);
  
    // Request made to the backend api
    // Send formData object
    const response = await axios.post("http://localhost:8080/file", formData);

    return response;
  };