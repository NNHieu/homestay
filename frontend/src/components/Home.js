import React from 'react';


//Alert
import { positions } from 'react-alert';

import CssBaseline from '@material-ui/core/CssBaseline';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Toolbar from '@material-ui/core/Toolbar';

import { Sidebar } from './layout/Sidebar'
import { Header } from './layout/Header'
import { useStyles } from './UseStyles'
import HsList from './homestay/HsList'






function Home() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header classes={classes} />
            <Sidebar classes={classes} />
            <main className={classes.content}>
                <Toolbar />

                <HsList />
            </main>
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