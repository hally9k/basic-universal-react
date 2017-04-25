import express from 'express';
import path from 'path';
import Raven from 'raven';
import renderPage from './app.js';

const app = express();

export default function(parameters) { // eslint-disable-line no-unused-vars
    Raven.config('https://2aad6397f8c1403ca2736bce7539f13c@sentry.io/157100').install();
    app.use(Raven.requestHandler());

    app.use(express.static(path.join(__dirname, '../client')));

    app.get('/*', function(req, res) {
        renderPage(req.url, (dom) => {
            res.send(dom);
        })
        .catch((error) => {
            res.send(error);
        });
    });

    app.use(Raven.errorHandler());

    app.listen(3000, function() { // eslint-disable-line no-magic-numbers
        console.log('Example app listening on port 3000!'); // eslint-disable-line no-console
    });
}
