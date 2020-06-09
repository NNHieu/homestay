import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGIN,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    REGISTER_SUCCESS,
    REGISTER,
    REGISTER_FAIL,
    AUTH_ERROR_HANDLE,
} from './types';

import axios from 'axios';
import Cookies from 'js-cookie';
import { getErrors } from './errors';


const initialState = {
    token: Cookies.get('auth_token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
    errors: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case LOGIN:
        case REGISTER:
            const success = action.payload.success
            action.callback(success, action.payload.errors)
            if (success) {
                // resonse success từ server
                Cookies.set('auth_token', action.payload.token, { 'sameSite': 'Strict' })
                return {
                    ...state,
                    isAuthenticated: true,
                    isLoading: false,
                    user: action.payload.user,
                    token: action.payload.token
                }
            } else {
                // response not success từ server
                console.log(action.payload.errors)
                return {
                    ...state,
                    isAuthenticated: false,
                    isLoading: false,
                    user: null,
                    token: null,
                    errors: action.payload.errors
                }
            }
        case AUTH_ERROR:
            Cookies.remove('auth_token')
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: null,
            }
        case LOGOUT_FAIL:
            return state
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
            console.log('Loging oouts')
            Cookies.remove('auth_token')
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: null,
            };
        case AUTH_ERROR_HANDLE:
            return {
                ...state,
                errors: null,
            }
        default:
            return state;
    }
}

/*
    ACTION
*/

const api_url = '/api/account';
axios.defaults.headers.post['X-CSRFToken'] = Cookies.get('csrftoken');


/**
 * 
 * @param {Object} user firstName, lastName, email, password
 * @param {requestCallback} errorHandler 
 */
export const signUp = (user, callback) => dispatch => {
    console.log(Cookies.get('csrftoken'));
    console.log(user);
    dispatch({ type: USER_LOADING })
    axios
        .post(`${api_url}/auth/signup`, user)
        .then(res => {
            dispatch({
                type: REGISTER,
                payload: res.data,
                callback: callback,
            })
        })
        .catch(err => {
            console.log('in signup action: ')
            console.log(err)
            console.log('-----------------')
        });
}

/**
 * 
 * @param { Object } authInfo email, password
 * @callback errorHandler error call back
 */
export const login = (authInfo, callback) => dispatch => {
    dispatch({ type: USER_LOADING });
    axios
        .post(`${api_url}/auth/login`, authInfo)
        .then(res => {
            dispatch({
                type: LOGIN,
                payload: res.data,
                callback: callback,
            })
        })
        .catch(err => {
            console.log('in login action: ')
            console.log(err)
            console.log('-----------------')
        });
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
            .post(`${api_url}/auth/logout`, {}, authHeaders)
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
                    type: LOGOUT_FAIL,
                });
            });
    }
};
