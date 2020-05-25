import axios from 'axios';
import Cookies from 'js-cookie';

import { ADD_USER, USER_LOADING, USER_LOADED, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, AUTH_ERROR } from './types';
import { getErrors } from './errors';

const api_url = '/account/api';
axios.defaults.headers.post['X-CSRFToken'] = Cookies.get('csrftoken');


//Signup USER
export const signUp = (user, errorHandler) => dispatch => {
    console.log(Cookies.get('csrftoken'));
    console.log(user);
    axios
        .post(api_url, user)
        .then(res => {
            console.log('Hela');
            dispatch({
                type: ADD_USER,
                payload: res.data,
            })
        })
        .catch(err => {
            console.log('Helo');
            console.log(err.response.data);
            let error_state = getErrors(err);
            console.log(error_state);
            dispatch(error_state);
            errorHandler(error_state.payload.msg);
        });
}

export const login = (authInfo, errorHandler) => dispatch => {
    axios
        .post(`${api_url}/auth/login`, authInfo)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch((err) => {
            errorHandler(err.response.data)
            dispatch(getErrors(err))
            dispatch({
                type: LOGIN_FAIL,
            })
        })
}

// Setup config with token - helper function
export const addAuthHeaders = method => {
    // Get token from state
    const token = Cookies.get('auth_token');
    // If token, add to headers config
    if (token)
        return { headers: Object.assign({ Authorization: `Token ${token}` }, axios.defaults.headers[method]) }
    return null;
};

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch) => {
    // User Loading
    let authHeaders = addAuthHeaders('get')
    if (!authHeaders) {
        dispatch({
            type: AUTH_ERROR,
        });
    } else {

        dispatch({ type: USER_LOADING });
        axios
            .get(`${api_url}/auth/user`, authHeaders)
            .then((res) => {
                console.log(res.data)
                dispatch({
                    type: USER_LOADED,
                    payload: res.data,
                });
            })
            .catch((err) => {
                dispatch(getErrors(err));
                dispatch({
                    type: AUTH_ERROR,
                });
            });
    }
};


// CHECK TOKEN & LOGOUT
export const logout = () => (dispatch) => {
    let authHeaders = addAuthHeaders('post')
    if (!authHeaders) {
        dispatch({
            type: AUTH_ERROR,
        });
    } else {

        dispatch({ type: USER_LOADING });
        console.log('Loging oout')
        axios
            .post(`${api_url}/auth/logout`, authHeaders)
            .then((res) => {
                console.log('Logout success'),
                    dispatch({
                        type: LOGOUT_SUCCESS,
                        payload: res.data,
                    });
            })
            .catch((err) => {
                console.log('Logout False')
                console.log(err.response)
                dispatch(getErrors(err));
                dispatch({
                    type: AUTH_ERROR,
                });
            });
    }
};


