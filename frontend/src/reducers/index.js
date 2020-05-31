import { combineReducers } from 'redux';
import auth from './auth';
import errors from './errors';
import homestay from './homestay'
import facilities from './facilities'
import upload from './upload'

export default combineReducers({
    auth,
    errors,
    homestay,
    facilities,
    upload
});