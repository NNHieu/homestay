import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';


import CompleteFillUploadForm from './progress-components/CompleteFillUploadForm.js.js';
import BottomNavButton from './BottomNavButton';
import ProgressSidebar from './ProgressSidebar';
import CustomedPaper from '../general/CustomedPaper.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(800 + theme.spacing(2) * 2)]: {
      width: 800,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  // paper: {
  //   marginTop: theme.spacing(3),
  //   marginBottom: theme.spacing(3),
  //   padding: theme.spacing(2),
  //   [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
  //     marginTop: theme.spacing(6),
  //     marginBottom: theme.spacing(6),
  //     padding: theme.spacing(3),
  //   },
  // },
}));



export default function UploadMain(props) {
  const classes = useStyles();
  const { activeStep, handleBack, handleNext, steps, getStepContent } = props

  return (
    <main className={classes.layout}>
      <Toolbar />
      <Toolbar />
      {/* <Paper className={classes.paper}> */}
      <React.Fragment>
        {activeStep === steps.length ? (
          <CompleteFillUploadForm />
        ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              {/* <CustomedPaper title="Custom" shortDescription="fasdffffffffffafasfdasssssssssssssssssssswerdecs">
                <Typography>
                  fasdfasdfter
                  </Typography>
              </CustomedPaper> */}
              <BottomNavButton handleBack={handleBack} handleNext={handleNext} activeStep={activeStep} stepLenght={steps.length} />
            </React.Fragment>
          )}
      </React.Fragment>
      {/* </Paper> */}
      <Copyright />
    </main>
  );
}
