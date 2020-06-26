import React from 'react';


//Alert
import { positions } from 'react-alert';

import CssBaseline from '@material-ui/core/CssBaseline';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

import { Header } from './layout/Header'
import HsList from './homestay/HsList'
import StickyFooter from './layout/Footer';
import { makeStyles } from '@material-ui/core';



export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    a: {
        textDecoration: "none",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));


function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header />
            <main className={classes.content}>
                <Toolbar />
                <HsList />
            </main>
            <StickyFooter />
        </div>
    );
}

export default function () {
    return (
        <ScopedCssBaseline>
            {/* The rest of your application */}
            <Home />
        </ScopedCssBaseline>
    );
}