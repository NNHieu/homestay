import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import { Provider as AlertProvider, positions } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import store from '../store';

import Header from "./layout/Header";
import Alerts from "./layout/Alerts";
import { default as UserSignupForm } from "./users/Forms";

import Users from "./users/Users";

//Alert Options
const alertOptions = {
    timeout: 3000,
    position: positions.TOP_CENTER,
    offset: '10px',

}

class App extends Component {
    render() {
        return (
            <Provider store={store} >
                <AlertProvider template={AlertTemplate} {...alertOptions}>
                    <Fragment>
                        <Header />
                        <Alerts />
                        <div className="container">
                            <UserSignupForm />
                            <Users />
                        </div>
                    </Fragment>
                </AlertProvider>
            </Provider >
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))