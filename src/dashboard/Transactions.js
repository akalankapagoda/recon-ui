import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

export default function Transactions(props) {

  const rows = props.rows ? props.rows : [];

  const partialDetails = props.partialDetails ? props.partialDetails : false;

  let additionalFieldsHeaders;

  if (partialDetails) {
    additionalFieldsHeaders = null;
  } else {

    additionalFieldsHeaders =
        <React.Fragment>
          <TableCell>Date</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Description</TableCell>
        </React.Fragment>;
  }

  function getAdditionalFieldValues(row)  {

    const partialDetails = props.partialDetails ? props.partialDetails : false;

    let additionalFieldValues;
    
  if (partialDetails) {
    additionalFieldValues = null;
  } else {
    additionalFieldValues = 
        <React.Fragment>
          <TableCell>{row.transactionDate}</TableCell>
          <TableCell>{row.transactionType}</TableCell>
          <TableCell>{row.description}</TableCell>
        </React.Fragment>
  }

  return additionalFieldValues;
  }

  return (
    <React.Fragment>
      <Title>{props.title}</Title>
      <TableContainer sx={{ maxHeight: 440 }}>
      <Table size="small" stickyHeader >
        <TableHead>
          <TableRow>
            <TableCell>Transaction Id</TableCell>
            {additionalFieldsHeaders}
            <TableCell>Wallet Ref</TableCell>
            <TableCell>Narrative</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.transactionId}>
              <TableCell>{row.transactionId}</TableCell>
              {getAdditionalFieldValues(row)}
              <TableCell>{row.walletReference}</TableCell>
              <TableCell>{row.narrative}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </React.Fragment>
  );
}
