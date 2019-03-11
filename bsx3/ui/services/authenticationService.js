/* eslint-disable eol-last */
/* eslint-disable indent */

// eslint-disable-next-line import/prefer-default-export
export const loginUserService = (request) => {
    const LOGIN_API_ENDPOINT = 'http://localhost:3000/api/v1/login';

    const parameters = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request.user)
    };

    return fetch(LOGIN_API_ENDPOINT, parameters)
        .then(response => response.json())
        .then(json => json);
};