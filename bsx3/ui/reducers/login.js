/* eslint-disable space-before-function-paren */
/* eslint-disable object-curly-spacing */
/* eslint-disable no-extra-semi */
/* eslint-disable eol-last */
/* eslint-disable indent */
import * as types from '../actions/general';

export default function(state = [], action) {
    // eslint-disable-next-line prefer-destructuring
    const response = action.response;
    switch (action.type) {
        case types.LOGIN_USER_SUCCESS:
            return {...state, response };
        case types.LOGIN_USER_ERROR:
            return {...state, response };
        default:
            return state;
    }
};