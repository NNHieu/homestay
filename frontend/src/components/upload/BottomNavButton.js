import React from 'react'
import { makeStyles, Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: theme.spacing(20)
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
}));

export default function BottomNavButton(props) {
    const classes = useStyles()

    return (
        <div className={classes.buttons}>
            {props.activeStep !== 0 && (
                <Button onClick={props.handleBack} className={classes.button}>
                    Back
                </Button>
            )}
            <Button
                variant="contained"
                color="primary"
                onClick={props.handleNext}
                className={classes.button}
            >
                {props.activeStep === props.stepLenght - 1 ? 'Place order' : 'Next'}
            </Button>
        </div>
    )
}
