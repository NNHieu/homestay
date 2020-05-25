import { GET_ERRORS } from './types';


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