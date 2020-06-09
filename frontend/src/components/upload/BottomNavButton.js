import React from 'react'
import { makeStyles, Button } from '@material-ui/core';
import { post } from '../../reducers/upload';
import { useSelector } from 'react-redux';
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
    const data = useSelector(state => state.upload)
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
                onClick={props.activeStep === props.stepLenght - 1 ? () => post(data) : props.handleNext}
                className={classes.button}
            >
                {props.activeStep === props.stepLenght - 1 ? 'Place order' : 'Next'}
            </Button>
        </div>
    )
}
