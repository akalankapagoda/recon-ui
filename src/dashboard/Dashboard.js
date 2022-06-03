import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import SourceFileUpload from './fileupload/SourceFileUpload.js';
import TargetFileUpload from './fileupload/TargetFileUpload.js';
import { startReconciliation, updateReconStatus, updateReconResults } from './DashboardSlice';
import { checkReconStatusAPI } from '../api/ReconAPI';
import Results from './Results';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const mdTheme = createTheme();

function DashboardContent() {

  const reconStatus = useSelector((state) => state.dashboard.reconStatus);
  const reconResults = useSelector((state) => state.dashboard.reconResults);

  const sourceUploadStatus = useSelector((state) => state.sourceFileUpload.uploadStatus);
  const targetUploadStatus = useSelector((state) => state.targetFileUpload.uploadStatus);
  const sourceFilename = useSelector((state) => state.sourceFileUpload.filename);
  const targetFilename = useSelector((state) => state.targetFileUpload.filename);

  const dispatch = useDispatch();

  var buttonDisabled = true;

  if (sourceUploadStatus === 'SUCCESS' && targetUploadStatus === 'SUCCESS') {
    buttonDisabled = false;
  }

  const color = reconStatus === 'NONE' ? 'primary' : reconStatus === 'SUCCESS' ? 'success' :  reconStatus === 'ERROR' ? 'error' : 'secondary';
  const label = reconStatus === 'NONE' ? 'Compare' : reconStatus === 'SENDING' ? 'Starting recon' : reconStatus === 'STARTED' ? 'Reconciliation In-Progress' : 'Success';

  if (reconStatus === 'STARTED') {
    checkReconResults(sourceFilename, targetFilename, dispatch);
  }

  function compare() {
    dispatch(startReconciliation([sourceFilename, targetFilename]));
  }

  async function checkReconResults(sourceFilename, targetFilename, dispatch) {
    const response = await checkReconStatusAPI(sourceFilename, targetFilename);

    const responseStatus = response.data.status;

    if (responseStatus === 'SUCCESS' || responseStatus === 'ERROR') {
      dispatch(updateReconStatus(responseStatus));
      dispatch(updateReconResults(response.data));
    } else { // Try again in another 2 second
      setTimeout(() => {  
        checkReconResults(sourceFilename, targetFilename, dispatch); 
      }, 2000);
    }
  }

  let results;

  if (reconStatus === 'SUCCESS' && reconResults) {
    results = <Results results={reconResults} />;
  } else {
    results = <Grid item xs={12}></Grid>;
  }

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar>
          <Toolbar>
            <Typography
              component="h1"
              variant="h4"
              color="inherit"
              align="center"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Transaction Reconciliation
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="main"
        >
          <Toolbar />
          <Container maxWidth="100%" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3} justifyContent="center">
              {/* Source File */}
              <Grid item xs={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240
                  }}
                >
                  <SourceFileUpload title="Select File 1" identifier="source" />
                </Paper>
              </Grid>
              {/* Target File */}
              <Grid item xs={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <TargetFileUpload title="Select File 2" identifier="target" />
                </Paper>
              </Grid>
              {/* Target File */}
              <Grid item xs={4}></Grid>
              <Grid item xs={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Button disabled={buttonDisabled} variant='contained' color={color} xs={3} onClick={() => compare()} >{label}</Button>
                </Paper>
              </Grid>
              <Grid item xs={4}></Grid>
              {results}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
