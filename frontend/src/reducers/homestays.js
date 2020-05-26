import { LOAD_DETAIL_HOMESTAY, LOAD_LIST_HOMESTAY, LOAD_LIST_HOMESTAY_FAIL, LOAD_DETAIL_HOMESTAY_FAIL, LOAD_LIST_FACILITY } from './types'
import axios from 'axios';
import Cookies from 'js-cookie';

const initialState = {
    list: [],
    detail: [],
}

export default function (state = initialState, action) {
    switch (action.type) {
        // Action load thong tin chi tiet cua 1 homestay
        case LOAD_DETAIL_HOMESTAY:
            return {
                ...state,
                detail: action.payload
            };
        // Action load thong tin ve 1 list homestay
        case LOAD_LIST_HOMESTAY:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state;
    }
}

/*
    ACTION
*/

// Send request post can gan them csrf token
axios.defaults.headers.post['X-CSRFToken'] = Cookies.get('csrftoken');
let api_url = '/homestay/api'

// LOAD LIST HOMESTAY
export const loadList = () => dispatch => {
    axios
        .get(`${api_url}/list`)
        .then(res => {
            console.log(res.data)
            dispatch({
                type: LOAD_LIST_HOMESTAY,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(getErrors(err))
            dispatch({
                type: LOAD_LIST_HOMESTAY_FAIL
            })
        })
}


// LOAD DETAIL HOMESTAY
export const loadDetail = (hid) => dispatch => {
    axios
        .get(`${api_url}/${hid}`)
        .then(res => {
            console.log(res)
            dispatch({
                type: LOAD_DETAIL_HOMESTAY,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch(getErrors(err))
            dispatch({
                type: LOAD_DETAIL_HOMESTAY_FAIL
            })
        })
}