import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadFile } from './sourceFileUploadSlice';
import Button from '@mui/material/Button'
import Title from '../Title';

  export default function SourceFileUpload(props) {

    const identifier = props.identifier;

    const uploadStatus = useSelector((state) => state.sourceFileUpload.uploadStatus);
    const dispatch = useDispatch();

    const variant = uploadStatus === 'NONE' ? 'outlined' : 'contained';
    const color = uploadStatus === 'NONE' ? 'primary' : uploadStatus === 'SUCCESS' ? 'success' :  uploadStatus === 'PENDING' ? 'secondary' : 'error';
    const label = uploadStatus === 'NONE' ? 'Upload' : uploadStatus === 'SUCCESS' ? 'Success' : uploadStatus === 'PENDING' ? 'Uploading...' : 'Error';

    return (
      <React.Fragment>
        <Title>{props.title}</Title>
        <Button
            label='Select File'>
            <input type="file" onChange={(event) => onFileChange(event, dispatch)} />
        </Button>
        <Button variant={variant} color={color}>{label}</Button>
      </React.Fragment>
    );
  }

  const onFileChange = (event, dispatch) => {
    dispatch(uploadFile(event.target.files[0]));
  };