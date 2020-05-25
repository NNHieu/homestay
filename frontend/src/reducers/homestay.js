import { LOAD_DETAIL_HOMESTAY, LOAD_LIST_HOMESTAY } from '../actions/types.js';

const initialState = {
    list: [],
    detail: []

}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOAD_DETAIL_HOMESTAY:
            return {
                ...state,
                detail: action.payload
            };
        case LOAD_LIST_HOMESTAY:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state;
    }
}