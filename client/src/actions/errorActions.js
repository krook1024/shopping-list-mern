import { GET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id },
    };
};

// RETURN ERRORS
export const clearErrors = (msg, status, id = null) => {
    return {
        type: CLEAR_ERRORS,
    };
};
