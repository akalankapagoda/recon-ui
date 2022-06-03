
import axios from 'axios';
import {reconAPIBaseURL} from './Configurations';

export const uploadFileAPI = async (identifier, file) => {
    
    const formData = new FormData();
  
    formData.append("file", file);
    formData.append("identifier", identifier);
  
    const response = await axios.post(reconAPIBaseURL + "/file", formData);

    return response;
  };

  export const checkUploadStatusAPI = async (identifier) => {
    
    const params = new URLSearchParams([['identifier', identifier]]);
  
    const response = await axios.get(reconAPIBaseURL + "/file/status", {params});

    return response;
  };

  export const reconAPI = async (filename1, filename2) => {
    
    const formData = new FormData();
  
    formData.append("source", filename1);
    formData.append("target", filename2);
  
    const response = await axios.post(reconAPIBaseURL + "/reconcile", formData);

    return response;
  };

  export const checkReconStatusAPI = async (filename1, filename2) => {
    
    const params = new URLSearchParams([['source', filename1], ['target', filename2]]);
  
    const response = await axios.get(reconAPIBaseURL + "/reconcile/results", {params});

    return response;
  };