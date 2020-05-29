import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomedPaper from '../../general/CustomedPaper';
import { Button, makeStyles, withStyles, ThemeProvider } from '@material-ui/core';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

// Icons 
import ApartmentIcon from '@material-ui/icons/Apartment';
import clsx from 'clsx';

// Like https://github.com/brunobertolini/styled-by
const styledBy = (property, mapping) => (props) => mapping[props[property]];

const styles = theme => ({
    root: {
        // background: styledBy('color', {
        //     default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        //     blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        // }),
        width: "90%",
        borderRadius: 3,
        border: 0,
        color: "black",
        height: 48,
        padding: theme.spacing(6),
        boxShadow: styledBy('color', {
            default: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            blue: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        }),
    },
    margin: {
        margin: "0px 10px"
    },
    selected: {
        background: styledBy('color', {
            default: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            blue: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        }),
        color: "white"
    }
});

const StyledButton = withStyles(styles)(({ classes, color, ...other }) => {
    const { value, option } = other
    const normalClass = classes.root
    const selectedClass = `${classes.root} ${classes.selected}`
    return (
        <Button className={value === option ? selectedClass : normalClass} onClick={(e) => other.onChose(e, option)} {...other.buttonProps} children={other.children} />
    )
})


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: "10px 0"
    }
}));

const Margin = (props) => (<div style={{ margin: props.size }}></div>)

export default function BasicInfo() {
    const [type, setType] = React.useState('null');


    const classes = useStyles()
    const handleChose = (e, option) => {
        console.log(option)
        console.log(type)
        if (option !== type)
            setType(option)
        else
            setType('null')
    }
    return (
        <CustomedPaper title="Cơ sở kinh doanh">
            <Typography variant="h6">
                Loại hình
            </Typography>
            <div className={classes.margin}></div>
            <Grid container >
                <Grid item xs={3}>
                    <StyledButton color='blue' option='apartment' value={type} onChose={handleChose} >Chung cư</StyledButton>
                </Grid>
                <Grid item xs={3}>
                    <StyledButton color='default' option='bungalow' value={type} onChose={handleChose}>Bungalow</StyledButton>
                </Grid>
                <Grid item xs={3}>
                    <StyledButton color='blue' option='ground-house' value={type} onChose={handleChose}>Nhà mặt đất</StyledButton>
                </Grid>
                <Grid item xs={3}>
                    <StyledButton color='default' option='villa' value={type} onChose={handleChose}>Biệt thự</StyledButton>
                </Grid>
            </Grid>
            <Margin size="20px" />
            <Typography variant="h6">
                Diện tích nơi ở
            </Typography>
            <div className={classes.margin}></div>
        </CustomedPaper >
        // <React.Fragment>
        //   <Typography variant="h6" gutterBottom>
        //     Địa điểm
        //   </Typography>

        // </React.Fragment>
    );
}
