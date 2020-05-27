import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'

//material-ui
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
    AppBar, Toolbar, Divider, Typography, Button, IconButton, TextField,
    Grid
}
    from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
//Icons
import HomeIcon from '@material-ui/icons/Home';
import LocationOnIcon from '@material-ui/icons/LocationOn';

import { testOutputGoogleAutoComplete } from '../../utils/location'


function loadScript(src, position, id) {
    if (!position) {
        return;
    }

    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('id', id);
    script.src = src;
    position.appendChild(script);
}

const autocompleteService = {
    current: (request, callback) => {
        console.log('In autocompleteService')
        console.log('request and callback')
        console.log(request)
        console.log(callback)
        const result = JSON.parse(testOutputGoogleAutoComplete)
        console.log(result)
        callback(result.predictions)
    }
};

const googleMapStyle = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

export default function GoogleMaps() {
    const classes = googleMapStyle();
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);
    const loaded = React.useRef(false);

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current(request, callback);
            }, 200),
        [],
    );

    React.useEffect(() => {
        let active = true;

        if (!autocompleteService.current) {
            return undefined;
        }

        if (inputValue === '') {
            setOptions(value ? [value] : []);
            return undefined;
        }

        fetch({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = [];

                if (value) {
                    newOptions = [value];
                }

                if (results) {
                    newOptions = [...newOptions, ...results];
                }

                setOptions(newOptions);
            }
        });

        return () => {
            active = false;
        };
    }, [value, inputValue, fetch]);

    return (
        <Autocomplete
            id="google- map-demo"
            style={{ width: 300, color: "white" }}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event, newValue) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Search location" variant="outlined" fullWidth />
            )}
            renderOption={(option) => {
                const matches = option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                );

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}

const headerStyle = makeStyles((theme) => ({
    header: {
        flexGrow: 1,
        zIndex: theme.zIndex.drawer + 1,
        backgroundColor: "rgb(100,100,200)",
    },
    searchAddress: {
        margin: theme.spacing(1),
        width: '40ch',
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function Header(props) {

    const [classes, setClasses] = useState(headerStyle())
    return (
        <AppBar position="fixed" className={classes.header}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <HomeIcon fontSize="large" />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Hanoi Homestay
                </Typography>
                <GoogleMaps />
                <Divider orientation="vertical" flexItem />
                <Button color="inherit">Login</Button>
                <Button color="inherit">Sign Up</Button>
            </Toolbar>
        </AppBar>
    )

}


