import React from 'react'
import { makeStyles, Stepper, Step, StepLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    stepper: {
        padding: theme.spacing(3, 0, 5),
    },
}));

export default function ProgressSidebar(props) {
    const classes = useStyles()
    const { activeStep, steps } = props
    return (
        <Stepper activeStep={activeStep} className={classes.stepper} orientation="vertical">
            {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
    )
}
