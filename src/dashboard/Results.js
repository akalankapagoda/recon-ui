import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Transactions from './Transactions';
import Title from './Title';

export default function results(props) {

    const results = props.results;

    return (
        <React.Fragment>
            <Grid item xs={12}></Grid>
            <Grid item xs={1}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Results</Title>
                </Paper>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={12}>
                <Paper elevation={5} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>File 1 Records Count : {results.sourceRecordsCount} </Title>
                    <Title>File 2 Records Count : {results.targetRecordsCount} </Title>
                    <Title>Match Count : {results.matchCount} </Title>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Suggestions</Title>
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Transactions title="Source Transaction" rows={results.sourceSuggestions} partialDetails={true} />
                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Transactions title="Target Transaction" rows={results.targetSuggestions} partialDetails={true} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Transactions title="Unmatched Source Transactions" rows={results.unmatchedSourceTransactions} />
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Transactions title="Unmatched Target Transactions" rows={results.unmatchedTargetTransactions} />
                </Paper>
            </Grid>
        </React.Fragment>
    );
}