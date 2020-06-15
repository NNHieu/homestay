import React from 'react';

//Redux store
import { Provider, useDispatch, useSelector } from 'react-redux';
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
import { loadUser } from '../reducers/auth';
import Blog from './detail/Blog';
import { AuthRoute } from './general/Routing';

function App() {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    if (auth.token && !auth.isAuthenticated && !auth.isLoading)
        loadUser()(dispatch)
    return (
        <Router history={history}>
            <Switch>
                <Route path='/auth/:subpath(login|signup)' component={AuthForm} />
                <Route path='/homestay/:hid([0-9]+)' component={Detail} />
                <AuthRoute path='/upload' component={Upload} />
                <Route path='/detail' component={Blog} />
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