import {
    UPLOAD_BASIC_INFO,
    UPLOAD_ADDRESS_INFO,
    UPLOAD_DESCRIPTION
} from './types';

import axios from 'axios';
import Cookies from 'js-cookie';
import { getErrors } from './errors';


const initialState = {
    basicInfo: {
        type: null,
        area: '',
        guestCapacity: 1,
        numBathroom: 0,
        numBedroom: 0
    },
    address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        country: '',
        zip: '',
    },
    description: {
        name: '',
        desc: '',
        suggest: '',
        houserules: '',
        howtofind: '',
        ownerrate: 0
    },
    facilties: {
        basic: [],
        comfort: [],
    }
};

export default function (state = initialState, action) {
    switch (action.type) {
        case UPLOAD_BASIC_INFO:
            return {
                ...state,
                basicInfo: { ...action.payload }
            }
        case UPLOAD_DESCRIPTION:
            return {
                ...state,
                description: { ...action.payload }
            }
        case UPLOAD_ADDRESS_INFO:
            return {
                ...state,
                address: { ...action.payload }
            }
        default:
            return state;
    }
}

/*
    ACTION
*/

export const saveBasicInfo = (basicInfo) => dispatch => {
    console.log('Save ')
    dispatch({
        type: UPLOAD_BASIC_INFO,
        payload: basicInfo
    })
}

export const saveAddress = (address) => dispatch => {
    console.log('Save ')
    dispatch({
        type: UPLOAD_ADDRESS_INFO,
        payload: address
    })
}

export const saveDescription = (description) => dispatch => {
    console.log('Save ')
    dispatch({
        type: UPLOAD_DESCRIPTION,
        payload: description
    })
}
