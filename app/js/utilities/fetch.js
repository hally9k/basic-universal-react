// import InternalServerErrorException from '../exceptions/internal-server-error';

import * as API from '../../../config/api';
// const SENTRY = require('../config/sentry');
import fetch from 'isomorphic-fetch';
// require('isomorphic-fetch');
// const fetch = require('node-fetch');
import Token  from './token';
// const Raven = require('raven');
// const winston = require('winston');

function Api(url) {
    return new Promise((resolve, reject) => {
        Token.fetch().then((token) => {
            authoriseApiRequest(url, token)
            .then((response) => {
                if (response.status === 200 || response.status === 404) { // eslint-disable-line no-magic-numbers
                    // winston.info('Response 200:', response.url);

                    return response.json();
                } else if (response.status === 401) { // eslint-disable-line no-magic-numbers
                    // winston.info('Response 401: Token being requested again!');

                    // Get new token
                    Token.fetch();

                    // Retry request
                    return Api(url);
                }

                // let apiError = `Response ${response.status} on API call for ${response.url}`;

                // winston.info(apiError);

                // Sentry error logging
                // Raven.config(SENTRY.DSN).install();
                // Raven.captureException(apiError);

                throw new Error(); // InternalServerErrorException();
            })
            .then((data) => resolve(data))
            .catch((error) => {
                // Sentry error logging
                // Raven.config(SENTRY.DSN).install();
                // Raven.captureException(error);

                reject(error);
            });
        });
    });
}

function authoriseApiRequest(url, token) {
    // winston.info('Token for request:', token.access_token);
    // console.log(JSON.stringify(token))
    return fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
            'Authorization': `${token.token_type} ${token.access_token}`
        },
        timeout: API.TIMEOUT
    });
}

export default Api;
