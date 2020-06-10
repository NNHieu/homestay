import {
    UPLOAD_BASIC_INFO,
    UPLOAD_ADDRESS_INFO,
    UPLOAD_DESCRIPTION,
    UPLOAD_FACILITIES,
    UPLOAD_PRICES,
    UPLOAD_RESESRVATION_DATE,
    UPLOAD_IMAGES
} from './types';

import axios from 'axios';
import Cookies from 'js-cookie';
import { getErrors } from './errors';

export const facilties_list = {
    basicFacilities: {
        title: "Tiện nghi thiết yếu",
        list: [
            { title: "máy điều hòa", id: 100 },
            { title: "tivi", id: 101 },
            { title: "internet miễn phí", id: 102 },
            { title: "bộ ga giường", id: 103 },
            { title: "máy sấy tóc", id: 104 },
            { title: "truyền hình cáp", id: 105 },
            { title: "máy giặt", id: 106 },
            { title: "khăn các loại", id: 107 },
        ]
    },
    comfortFacilities: {
        title: "Sự thoải mái",
        list: [
            { title: "lối vào riêng", id: 200 },
            { title: "thang máy trong tòa nhà", id: 201 },
            { title: "xe lăn vào được", id: 202 },
            { title: "chuông/liên lạc không dây", id: 203 },
            { title: "nhân viên trực cửa", id: 204 },
        ]
    }
}

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
    facilities: {},
    prices: {
        min: null,
        addition: null,
        additionFrom: null,
        paymentMethod: null,
    },
    reservationDate: {
        preTime: 'anytime',
        minNight: 1,
        maxNight: 1,
        availableDate: null,
        cancel: null,
        excludeDays: []
    },
    images: []
};

for (let k in facilties_list) {
    initialState.facilities[k] = new Array(facilties_list[k].list.length).fill(false)
}

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
        case UPLOAD_FACILITIES:
            return {
                ...state,
                facilities: { ...action.payload }
            }
        case UPLOAD_PRICES:
            return {
                ...state,
                prices: { ...action.payload }
            }
        case UPLOAD_RESESRVATION_DATE:
            return {
                ...state,
                reservationDate: { ...action.payload }
            }
        case UPLOAD_IMAGES:
            return {
                ...state,
                images: action.payload
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

export const savePrices = (prices) => dispatch => {
    dispatch({
        type: UPLOAD_PRICES,
        payload: prices,
    })
}

export const saveReservationDate = (info) => dispatch => {
    dispatch({
        type: UPLOAD_RESESRVATION_DATE,
        payload: info,
    })
}

export const saveImages = (info) => dispatch => {
    dispatch({
        type: UPLOAD_IMAGES,
        payload: info
    })
}

export const validate = (info, field) => {
    return true
    console.log('validating')
    for (let k in initialState[field]) {
        if (info[k] === undefined || info[k] === null || info[k] === '')
            return false
    }
    return true
}

export const post = (data) => {
    axios.post('/api/account/auth/signup', data)
        .then(res => {
            console.log(data)
        })
}