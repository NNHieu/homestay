import React, { Component } from 'react'
import PropTypes from 'prop-types'


//Material-UI
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Checkbox, InputBase } from '@material-ui/core';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';

//-------------------------InputTags-------------------------------------
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        '& > * + *': {
            marginTop: theme.spacing(3),
        },
    },
}));

function InputTags(props) {

    const classes = useStyles();
    return (
        // <div className={classes.root}>
        <Autocomplete
            multiple
            {...props.autocomplete}
            options={props.options}
            disableCloseOnSelect
            renderOption={(option, { selected }) => {
                return (
                    < React.Fragment >
                        <Checkbox
                            icon={icon}
                            size="small"
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.title}
                    </React.Fragment >
                )
            }
            }
            getOptionLabel={(option) => option.title}
            renderInput={(params) => {
                console.log(params)
                return (
                    <TextField {...params} {...props.textfield} />
                    // <TextField {...params} variant="outlined" label="limitTags" placeholder="Favorites" />
                )
            }}
        // renderInput={params => (
        //     <InputBase
        //         ref={params.ref}
        //         ref={params.InputProps.ref}
        //         inputProps={params.inputProps}
        //     />)}
        />
        // </div>s
    );
}

InputTags.propTypes = {
    autocomplete: PropTypes.object,
    textfield: PropTypes.object,
    options: PropTypes.array.isRequired
}

/**
 * 
 * @param options Option list
 * @param autocomplete Autocomplete props
 * @param textfield Textfield props
 */
export default InputTags


