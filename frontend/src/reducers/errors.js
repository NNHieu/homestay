import { GET_ERRORS } from './types.js';

const initialState = {
    error_code: null,
    msg: {},
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            return {
                error_code: action.payload.error_code,
                msg: action.payload.msg,
            };
        default:
            return state;
    }
}

/*
    ACTION
*/

export const getErrors = (err) => {
    const error = {
        error_code: err.response.status,
        msg: err.response.data
    };
    return {
        type: GET_ERRORS,
        payload: error
    }
};