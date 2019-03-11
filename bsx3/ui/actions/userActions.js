/* eslint-disable no-use-before-define */
/* eslint-disable semi */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
/* eslint-disable eol-last */
import { createBrowserHistory } from 'history';
import { userConstants } from '../constants';
import { userService } from '../services/user.service';
import { alertActions } from './alert.actions';

// eslint-disable-next-line import/prefer-default-export
// export const login = (user) => ({
//     type: types.LOGIN_USER,
//     user
// })
export const history = createBrowserHistory();
// eslint-disable-next-line import/prefer-default-export
export const userActions = {
    login,
    logout,
    // getAll
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        if (username === 'test') {
            history.push('/');
            alert('ou bon')
        } else {
            alert('ou pa fout bon')
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        }

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }

    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}