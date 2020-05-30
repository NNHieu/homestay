import React from 'react';

//Redux store
import { Provider } from 'react-redux';
import store from '../store';

import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';

//Router
import {
    Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
} from "react-router-dom";
import history from '../utils/history'

import Home from './Home'
import { AuthForm } from './users/AuthForms'
import Detail from './Detail'
import FilterDiv from './homestay/FilterDiv'
import Upload from './upload/Upload'
import SignInSide from './users/SignInSide';
function App() {
    return (
        <Router history={history}>
            <Switch>
                <Route path='/auth/:subpath(login|signup)' component={AuthForm} />
                <Route path='/homestay/:hid([0-9]+)' component={Detail} />
                {/* <Route path='/checkout' component={Checkout} /> */}
                <Route path="/" component={Home} />
            </Switch>
        </Router>
    );
}

// function App() {
//     return (
//         <Upload />
//     )
// }

export default function MyApp() {
    return (
        <ScopedCssBaseline>
            <Provider store={store}>
                <App />
            </Provider>
        </ScopedCssBaseline>
    );
}