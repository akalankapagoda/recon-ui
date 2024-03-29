import * as React from 'react';
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { uploadFile, setFilename, updateUploadStatus } from './SourceFileUploadSlice';
import Button from '@mui/material/Button'
import Title from '../Title';
import { checkUploadStatusAPI } from '../../api/ReconAPI';

  export default function SourceFileUpload(props) {

    const sourceRef = useRef();

    const uploadStatus = useSelector((state) => state.sourceFileUpload.uploadStatus);
    const filename = useSelector((state) => state.sourceFileUpload.filename);
    const dispatch = useDispatch();

    if (sourceRef.current && uploadStatus === 'NONE') {
      sourceRef.current.value = "";
    }

    const variant = uploadStatus === 'NONE' ? 'outlined' : 'contained';
    const color = uploadStatus === 'NONE' ? 'primary' : uploadStatus === 'SUCCESS' ? 'success' :  uploadStatus === 'ERROR' ? 'error' : 'secondary';
    const label = uploadStatus === 'NONE' ? 'Select File to begin' : uploadStatus === 'SUCCESS' ? 'Success' : uploadStatus === 'ERROR' ? 'Error' : 'Uploading...';

    if (uploadStatus === 'UPLOADED') {
      checkFileProcessingStatus(filename, dispatch);
    }

    return (
      <React.Fragment>
        <Title>{props.title}</Title>
        <Button
            label='Select File'>
            <input type="file" ref={sourceRef} onChange={(event) => onFileChange(event, dispatch)} />
        </Button>
        <Button fullWidth variant={variant} color={color}>{label}</Button>
      </React.Fragment>
    );
  }

  const onFileChange = (event, dispatch) => {
    const file = event.target.files[0];
    dispatch(setFilename(file.name));
    dispatch(uploadFile(file));
  };

  const checkFileProcessingStatus = async (filename, dispatch) => {
    const response = await checkUploadStatusAPI(filename);

    const responseStatus = response.data.status;

    if (responseStatus === 'SUCCESS' || responseStatus === 'ERROR') {
      dispatch(updateUploadStatus(responseStatus));
    } else { // Try again in another 2 second
      setTimeout(() => {  
        checkFileProcessingStatus(filename, dispatch); 
      }, 2000);
    }
  }