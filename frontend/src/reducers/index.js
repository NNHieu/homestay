import { combineReducers } from 'redux';
import auths from './auth';
import errors from './errors';
import homestays from './homestays'
import facilities from './facilities'

export default combineReducers({
    auths,
    errors,
    homestays,
    facilities,
});