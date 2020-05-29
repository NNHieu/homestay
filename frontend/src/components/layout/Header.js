import React, { Component, useState } from 'react'
import PropTypes from 'prop-types'

//material-ui
import {
    AppBar, Toolbar, Divider, Typography, Button, IconButton, TextField,
    Grid
}
    from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

//Icons
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';

//Urls
import { LOGIN_URL, SIGNUP_URL } from '../../urls'
import history from '../../utils/history';

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
                <Divider orientation="vertical" flexItem />
                <Button color="inherit" onClick={() => history.push(LOGIN_URL)}> Login</Button>

                <Button color="primary" variant="contained" onClick={() => history.push(SIGNUP_URL)}>Sign Up</Button>

            </Toolbar>
        </AppBar>
    )

}


