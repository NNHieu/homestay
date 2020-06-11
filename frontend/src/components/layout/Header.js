import React, { Component, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
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
import { logout } from '../../reducers/auth';
import { RedButton } from '../general/button';


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
    const authState = useSelector(state => state.auth.isAuthenticated)
    const userInfo = useSelector(state => state.auth.user)
    const dispatch = useDispatch() //used for logout

    const classes = headerStyle()
    return (
        <>
            <AppBar position="fixed" className={classes.header}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <HomeIcon fontSize="large" />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Hanoi Homestay
                </Typography>
                    <Divider orientation="vertical" flexItem />
                    {
                        !authState ?
                            (
                                <>
                                    <Button color="inherit" onClick={() => history.push(LOGIN_URL)}> Login</Button>
                                    <Button color="primary" variant="contained" onClick={() => history.push(SIGNUP_URL)}>Sign Up</Button>
                                </>
                            ) : (
                                <>
                                    {userInfo.is_verified ?
                                        <>
                                            <Button color="primary" variant="contained" onClick={() => history.push('/upload')}>Upload your homestay</Button>
                                            <Button color="inherit" onClick={() => logout()(dispatch)}> {userInfo.first_name} </Button>
                                        </>
                                        :
                                        <RedButton >{userInfo.first_name} </RedButton>
                                    }

                                    <Button color="inherit" onClick={() => logout()(dispatch)}> Logout</Button>
                                </>

                            )
                    }

                </Toolbar>
            </AppBar >
            <Toolbar />
        </>
    )

}


