import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadFile } from './targetFileUploadSlice';
import Button from '@mui/material/Button'
import Title from '../Title';

  export default function FileUpload(props) {

    const identifier = props.identifier;

    const uploadStatus = useSelector((state) => state.targetFileUpload.uploadStatus);
    const dispatch = useDispatch();

    const variant = uploadStatus === 'NONE' ? 'outlined' : 'contained';
    const color = uploadStatus === 'SUCCESS' ? 'success' : 'primary';
    const label = uploadStatus === 'NONE' ? 'Upload' : uploadStatus === 'SUCCESS' ? 'Success' : 'Error';

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
    dispatch(uploadFile('source', event.target.files[0]));
    // alert(event.target.files[0]);
    // Update the state
    // this.setState({ selectedFile: event.target.files[0] });
  
  };