'use strict'; // eslint-disable-line

const API = require('../config/api');
const SENTRY = require('../config/sentry');

const fetch = require('node-fetch');
const formUrlEncoded = require('form-urlencoded');
const Raven = require('raven');
const winston = require('winston');

class Token {
    constructor() {
        this.token = undefined;

        this.tokenRequestBody = formUrlEncoded({
            grant_type: 'client_credentials', // eslint-disable-line
            client_id: API.CLIENT_ID, // eslint-disable-line
            client_secret: API.CLIENT_SECRET // eslint-disable-line
        });

        this.tokenRequest = {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'content-length': this.tokenRequestBody.length
            },
            method: 'POST',
            body: this.tokenRequestBody
        };
    }

    fetch() {
        return new Promise((resolve, reject) => {
            winston.log('Fetching Token');

            fetch(API.ENDPOINTS.TOKEN, this.tokenRequest)
            .then((response) => {
                return response.json()
                    .then((reponseJson) => {
                        winston.log('Retrieved new Token');

                        this.set(reponseJson); // eslint-disable-line
                        resolve(reponseJson);
                    });
            })
            .catch(function(error) {
                winston.log('Error with Token');
                winston.log(error.message);
                winston.log(error.stack);

                // Sentry error logging
                Raven.config(SENTRY.DSN).install();
                Raven.captureException(error);

                reject(new Error(error));
            });
        });
    }

    reset() {
        this.token = undefined;
    }

    get isSet() {
        return this.token !== undefined;
    }

    set(token) {
        this.token = token;
    }

    get() {
        if (this.isSet) {
            return this.token;
        }

        return null;
    }
}

module.exports = new Token();
