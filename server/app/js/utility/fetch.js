
import InternalServerErrorException from '../exceptions/internal-server-error';

const API = require('../config/api');
const SENTRY = require('../config/sentry');

const fetch = require('node-fetch');
const Token = require('./token');
const Raven = require('raven');
const winston = require('winston');

function Api(url) {
    return new Promise((resolve, reject) => {
        authoriseApiRequest(url, Token.get())
        .then((response) => {
            if (response.status === 200 || response.status === 404) { // eslint-disable-line no-magic-numbers
                winston.info('Response 200:', response.url);

                return response.json();
            } else if (response.status === 401) { // eslint-disable-line no-magic-numbers
                winston.info('Response 401: Token being requested again!');

                // Get new token
                Token.fetch();

                // Retry request
                return Api(url);
            }

            let apiError = `Response ${response.status} on API call for ${response.url}`;

            winston.info(apiError);

            // Sentry error logging
            Raven.config(SENTRY.DSN).install();
            Raven.captureException(apiError);

            throw new InternalServerErrorException();
        })
        .then((data) => resolve(data))
        .catch((error) => {
            // Sentry error logging
            Raven.config(SENTRY.DSN).install();
            Raven.captureException(error);

            reject(error);
        });
    });
}

function authoriseApiRequest(url, token) {
    winston.info('Token for request:', token.access_token);

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

module.exports = Api;


const mockResponse = { // eslint-disable-line no-unused-vars
    'meta': {
        'result_count': 1
    },
    'links': {
        'self': 'http://api.rfadev.pixelfusion.co.nz/v1/content/pages?slug=otter',
        'first': 'http://api.rfadev.pixelfusion.co.nz/v1/content/pages?slug=otter&page=1',
        'last': 'http://api.rfadev.pixelfusion.co.nz/v1/content/pages?slug=otter&page=1',
        'next': null,
        'prev': null
    },
    'data': [
        {
            'type': 'pages',
            'id': '1',
            'attributes': {
                'slug': 'otter',
                'display_name': 'Otter',
                'thumbnail': 'http://cms.rfadev.pixelfusion.co.nz/assets/media/otter.jpg',
                'main_images': [
                    'http://cms.rfadev.pixelfusion.co.nz/assets/media/otter.jpg'
                ],
                'seo_keywords': 'Otters',
                'seo_description': 'Otters, otters and more otters.',
                'blocks': [
                    {
                        'type': 'content',
                        'data': {
                            'content': '<p>Header</p>\r\n\r\n<ul>\r\n\t<li>kgiugi</li>\r\n\t<li>jfyfy</li>\r\n\t<li>hgiyfi</li>\r\n</ul>\r\n'
                        }
                    },
                    {
                        'type': 'gallery',
                        'data': [
                            {
                                'file': 'http://cms.rfadev.pixelfusion.co.nz/assets/media/otter.jpg',
                                'creditline': ''
                            },
                            {
                                'file': 'http://cms.rfadev.pixelfusion.co.nz/assets/media/otter.jpg',
                                'creditline': ''
                            }
                        ]
                    }
                ],
                'grid_title': null,
                'above_grid_blocks': []
            },
            'links': {
                'self': 'http://api.rfadev.pixelfusion.co.nz/v1/content/pages/1'
            }
        }
    ]
};
