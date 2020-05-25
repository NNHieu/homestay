import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { Provider as AlertProvider, positions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import store from '../store';

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import { SignUp as UserSignupForm, Login as LoginForm, SignUpForm } from "./users/Forms";
import { HomestayCard } from './homestay/HomestayCard'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


//Alert Options
const alertOptions = {
    timeout: 3000,
    position: positions.TOP_CENTER,
    offset: '10px',
}

class HomePage extends Component {
    render() {
        return (
            <>
                <h1>Hello</h1>
                <HomestayCard />
            </>
        )
    }
}

export class App extends Component {
    onLoginClick = e => {

    }

    render() {
        return (
            <Provider store={store} >
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Fragment>
                        <Header />
                        <Alerts />
                        <div className="auth-wrapper">
                            <div className="auth-inner">
                                <Switch>
                                    <Route exact path='/' component={HomePage} />
                                    <Route path="/login" component={LoginForm} />
                                    <Route path="/signup" component={SignUpForm} />
                                </Switch>
                            </div>
                        </div>
                    </Fragment>
                </AlertProvider>
            </Provider >
        )
    }
}

export default App