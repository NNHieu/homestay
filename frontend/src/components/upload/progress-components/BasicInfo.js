import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CustomedPaper from '../../general/CustomedPaper';
import { Button, makeStyles, withStyles, ThemeProvider, List, ListItem, FormControl, InputLabel, Input, InputAdornment, IconButton, OutlinedInput } from '@material-ui/core';

import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import NumberFormat from 'react-number-format';
import NumberPlusMinus from '../../general/NumberPlusMinus';
import clsx from 'clsx';

// Icons 
import ApartmentIcon from '@material-ui/icons/Apartment';

//Reducers
import { saveBasicInfo } from '../../../reducers/upload'




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


function NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
        <NumberFormat
            {...other}
            style={{ textAlign: "right" }}
            // getInputRef={inputRef}
            onValueChange={(values) => {
                onChange(values.value, props.name);
            }}
            thousandSeparator
            isNumericString
        />
    );
}

NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const Margin = (props) => (<div style={{ margin: props.size }}></div>)

export default function BasicInfo() {
    const state = useSelector(state => state.upload.basicInfo)
    const dispatch = useDispatch()
    const classes = useStyles()

    const handleChose = (e, option) => {
        state.type = state.type !== option ? option : null
        saveBasicInfo(state)(dispatch)
    }

    const handleChange = (value, name) => {
        state[name] = value
        saveBasicInfo(state)(dispatch)
    };
    return (
        <List>
            <ListItem>
                <CustomedPaper title="Cơ sở kinh doanh">
                    <Typography variant="h6">
                        Loại hình
                    </Typography>
                    <div className={classes.margin}></div>
                    <Grid container >
                        {
                            [
                                { props: { color: 'blue', option: 'apartment' }, title: 'Chung cư' },
                                { props: { color: 'default', option: 'bungalow' }, title: 'Bungalow' },
                                { props: { color: 'blue', option: 'ground-house' }, title: 'Nhà mặt đất' },
                                { props: { color: 'default', option: 'villa' }, title: 'Biệt thự' },
                            ].map(line => (
                                <Grid key={line.title} item xs={3}>
                                    <StyledButton {...line.props} value={state.type} onChose={handleChose} >{line.title}</StyledButton>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <Margin size="20px" />
                    <Typography variant="h6">
                        Diện tích nơi ở
                    </Typography>
                    <Grid container>
                        <Grid item xs={3}>
                            <TextField
                                size="small"
                                variant="outlined"
                                value={state.area}
                                onChange={handleChange}
                                name="area"
                                id="formatted-numberformat-input"
                                InputProps={{
                                    inputComponent: NumberFormatCustom,
                                    endAdornment: <InputAdornment position="end">mét vuông</InputAdornment>,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.margin}></div>
                </CustomedPaper >
            </ListItem>
            <ListItem>
                <CustomedPaper title="Thông tin phòng ở">
                    <Grid container>
                        {
                            [
                                { title: 'Sức chứa', name: 'guestCapacity', min: 1, max: 20 },
                                { title: 'Phòng tắm', name: 'numBathroom', min: 0, max: 10 },
                                { title: 'Phòng ngủ', name: 'numBedroom', min: 0, max: 10 },
                            ].map(
                                line => (
                                    <Fragment key={line.name}>
                                        <Grid item xs={12}>
                                            <Margin size="20px" />
                                            <Typography variant="h6">{line.title}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <NumberPlusMinus defaultValue={state[line.name]} min={line.min} max={line.max} name={line.name} onChange={handleChange} />
                                        </Grid>
                                    </Fragment>
                                )
                            )
                        }
                    </Grid>

                </CustomedPaper>
            </ListItem>

        </List >
    );
}
