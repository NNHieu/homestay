import { combineReducers } from 'redux';
import auths from './auth';
import errors from './errors';
import homestay from './homestay'
import facilities from './facilities'
import upload from './upload'

export default combineReducers({
    auths,
    errors,
    homestay,
    facilities,
    upload
});