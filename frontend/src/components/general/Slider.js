import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 300 + theme.spacing(3) * 2,
        height: "auto",
        margin: theme.spacing(2)
    },
    margin: {
        height: theme.spacing(3),
    },
}));

function ValueLabelComponent(props) {
    const { children, open, value } = props;

    return (
        <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
            {children}
        </Tooltip>
    );
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
};

const PrettoSlider = withStyles({
    root: {
        color: '#52af77',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
    },
    rail: {
        height: 8,
        borderRadius: 4,
    },
})(Slider);

export default function CustomizedSlider(props) {
    const classes = useStyles();
    const [values, setValues] = React.useState([20, 40])
    const handleSliderChange = (event, newValues) => {
        setValues(newValues);
    };
    return (
        <div className={classes.root}>
            <Grid container justify="space-between">
                <Grid item xs={12}>
                    <Typography inline variant="body1" align="left">{props.label}</Typography>
                </Grid>
                <Grid item>
                    <Typography inline variant="body1" align="right">{values[0]} - {values[1]}</Typography>
                </Grid>
            </Grid>
            <PrettoSlider valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={[20, 40]}
                onChange={(e, values) => handleSliderChange(e, values)}
            />
        </div>
    );
}
