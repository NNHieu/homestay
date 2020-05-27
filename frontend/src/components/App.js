import React from 'react';

//Redux store
import { Provider } from 'react-redux';
import store from '../store';

//Alert
import { Provider as AlertProvider, positions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';


import { Sidebar } from './layout/Sidebar'
import { Header } from './layout/Header'
import { useStyles } from './UseStyles'
import HsList from './homestay/HsList'


//Alert Options
const alertOptions = {
    timeout: 3000,
    position: positions.TOP_CENTER,
    offset: '10px',
}


function App() {
    const classes = useStyles();

    return (
        <Provider store={store}>

            <div className={classes.root}>
                <CssBaseline />
                <Header classes={classes} />
                <Sidebar classes={classes} />
                <main className={classes.content}>
                    <Toolbar />

                    <HsList />
                </main>
            </div>
        </ Provider>
    );
}

export default function MyApp() {
    return (
        <ScopedCssBaseline>
            {/* The rest of your application */}
            <App />
        </ScopedCssBaseline>
    );
}