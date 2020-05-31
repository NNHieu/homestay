import React from 'react'
import { makeStyles, Stepper, Step, StepLabel, StepContent, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
}));

export default function ProgressSidebar(props) {
    const classes = useStyles()
    const { activeStep, steps, getStepDescription, handleBack, handleNext } = props
    return (
        <Stepper activeStep={activeStep} className={classes.stepper} orientation="vertical">
            {steps.map((label, index) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                    <StepContent>
                        <Typography>{getStepDescription(index)}</Typography>
                        <div className={classes.actionsContainer}>
                            <div>
                                <Button
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    className={classes.button}
                                >
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                </Button>
                            </div>
                        </div>
                    </StepContent>
                </Step>
            ))}
        </Stepper>
    )
}
