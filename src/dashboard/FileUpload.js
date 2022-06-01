import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Title from './Title';

function preventDefault(event) {
    event.preventDefault();
  }

  export default function FileUpload(props) {
    return (
      <React.Fragment>
        <Title>{props.title}</Title>
        <Button
            label='Select File'>
            <input type="file" />
        </Button>
        <Button variant="outlined">Upload</Button>
      </React.Fragment>
    );
  }