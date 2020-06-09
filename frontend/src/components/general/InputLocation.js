//--------------------------Google Map-----------------------------------
import React from 'react'
import { testOutputGoogleAutoComplete, autoCompleteLocation } from '../../utils/location'
import { makeStyles } from '@material-ui/core/styles';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

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
        autoCompleteLocation(request.input, result => callback(result.suggestions), console.log)
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
    input: {
        color: "white"
    }
}));

export default function InputLocation(props) {
    const classes = googleMapStyle();
    const [value, setValue] = React.useState(null);
    const [inputValue, setInputValue] = React.useState('');
    const [options, setOptions] = React.useState([]);

    const fetch = React.useMemo(
        () =>
            throttle((request, callback) => {
                autocompleteService.current(request, callback);
            }, 1000),
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
            console.log('results')
            console.log(results)
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
            style={{ width: "100%", color: "white" }}
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
                <TextField {...params} label="Search location" variant={props.inputVariant ? props.inputVariant : "outlined"} fullWidth />
            )}
            renderOption={(option) => {
                console.log(`Render option ${option}`)

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {/* {parts.map((part, index) => (
                                <span key={index} style={{ fontWeight: part.highlight ? 700 : 400 }}>
                                    {part.text}
                                </span>
                            ))} */}
                            {/* <Typography variant="body2" color="textSecondary">
                                {option.label}
                            </Typography> */}
                            <p>
                                {option.label}
                            </p>
                        </Grid>
                    </Grid>
                );
            }}
        />
    );
}
