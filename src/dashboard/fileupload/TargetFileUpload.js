/*
* Note that this is a duplicate of SourceFileUpload.
* We need to use namespaces to differentiate statuses of similar components if we want to reuse the same component with redux.
*/
import * as React from 'react';
import { useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { uploadFile, setFilename, updateUploadStatus } from './TargetFileUploadSlice';
import Button from '@mui/material/Button'
import Title from '../Title';
import { checkUploadStatusAPI } from '../../api/ReconAPI';

  export default function FileUpload(props) {

    const targetRef = useRef();

    const uploadStatus = useSelector((state) => state.targetFileUpload.uploadStatus);
    const filename = useSelector((state) => state.targetFileUpload.filename);
    const dispatch = useDispatch();

    if (targetRef.current && uploadStatus === 'NONE') {
      targetRef.current.value = "";
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
            <input type="file" ref={targetRef}  onChange={(event) => onFileChange(event, dispatch)} />
        </Button>
        <Button variant={variant} color={color}>{label}</Button>
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