import App from "./components/App"
import ReactDOM from "react-dom";
import React, { Component, Fragment } from "react";
import { BrowserRouter } from 'react-router-dom';

let app = document.getElementById('app')
let login = document.getElementById('login')
if (app)
    ReactDOM.render(<BrowserRouter>
        <App />
    </BrowserRouter>, document.getElementById('app'))
