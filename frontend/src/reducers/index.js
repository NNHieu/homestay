import { combineReducers } from 'redux';
import auths from './auth';
import errors from './errors';

export default combineReducers({
    auths,
    errors,
});