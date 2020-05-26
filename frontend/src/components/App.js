import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { Provider as AlertProvider, positions } from 'react-alert';
// Dnd
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import AlertTemplate from 'react-alert-template-basic';

import store from '../store';

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import { SignUp as UserSignupForm, Login as LoginForm, SignUpForm } from "./users/Forms";
import HsList from './homestay/HsList'
import FacilityToggleList from './homestay/FacilityList'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Sidebar from './homestay/Sidebar'

//Alert Options
const alertOptions = {
    timeout: 3000,
    position: positions.TOP_CENTER,
    offset: '10px',
}

export class App extends Component {
    onLoginClick = e => {

    }

    render() {
        return (
            <Provider store={store} >
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <DndProvider backend={HTML5Backend}>
                        <Fragment>
                            <Header />
                            <Alerts />
                            <div className="container-fluid">
                                <div className="row">
                                    <Sidebar />
                                    <main className="col-md-9 ml-sm-auto col-lg-10 px-4" role="main">
                                        <HsList />
                                    </main>
                                </div>
                            </div>
                        </Fragment>

                    </DndProvider>
                </AlertProvider>
            </Provider >
        )
    }
}

export default App