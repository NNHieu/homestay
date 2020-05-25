import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
} from '../actions/types';
import Cookies from 'js-cookie';


const initialState = {
    token: Cookies.get('auth_token'),
    isAuthenticated: false,
    isLoading: false,
    user: null,
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
        case LOGIN_SUCCESS:
            Cookies.set('auth_token', action.payload.token)
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                token: action.payload.token
            };
        case REGISTER_SUCCESS:
            Cookies.set('auth_token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case AUTH_ERROR:
            Cookies.remove('auth_token')
            return {
                ...state,
                token: '',
                isAuthenticated: false,
                isLoading: false,
                user: null,
            }
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
        case REGISTER_FAIL:
            Cookies.remove('auth_token')
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };
        default:
            return state;
    }
}