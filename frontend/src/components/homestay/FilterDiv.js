import React, { Component } from 'react'
import { useSelector, useDispatch } from 'react-redux'


//Material UI
import { Grid, Paper, AppBar, Toolbar, IconButton, Typography, InputBase, Button } from '@material-ui/core'
import { fade, makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
// Reducers
import { filterString, loadFacilities, getListSuggestFacility } from '../../reducers/facilities';
import { loadList as loadHomestayList } from '../../reducers/homestay'

// Custom components
import InputTags from '../general/InputTags';
import InputLocation from '../general/InputLocation';
import MenuListComposition from '../general/ToggleMenu';
import SearchInput from '../general/ShrinkInput';
import CustomizedSlider from '../general/Slider';



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: "100%",
        padding: theme.spacing(0),
        textAlign: 'center',
    },
    button: {
        height: "100%",
        width: "100%"
    }
}));

export default function FilterDiv() {
    const classes = useStyles()
    const houseFacilities = useSelector(state => getListSuggestFacility(false)(state))
    const areaFacilities = useSelector(state => getListSuggestFacility(true)(state))
    const dispatch = useDispatch()
    React.useEffect(() => {
        loadFacilities()(dispatch)
        console.log('in effect')
    }, [])

    const setFacilitiesCheckedState = (e, values) => {
        console.log(values)
        if (values.length)
            loadHomestayList({ facilities: filterString(values) })(dispatch)
        else
            loadHomestayList()(dispatch)
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Paper>
                        <InputLocation />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper>
                        <InputTags options={areaFacilities} autocomplete={{
                            limitTags: 1,
                            onChange: setFacilitiesCheckedState,
                            getOptionSelected: (option, value) => {
                                return value.id === option.id
                            }
                        }}
                            textfield={{ variant: "outlined", label: "Area Facilities" }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={2}>
                    <Paper>
                        <InputTags options={houseFacilities} autocomplete={{
                            limitTags: 1,
                            onChange: setFacilitiesCheckedState,
                            getOptionSelected: (option, value) => {
                                return value.id === option.id
                            },
                        }}
                            textfield={{ variant: "outlined", label: "House Facilities" }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={2} >
                    <MenuListComposition />
                </Grid>
            </Grid>
        </div>

    )
}
