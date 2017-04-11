import Raven from 'raven';
import path from 'path';
import renderPage from './app/js';

import express from 'express';
const app = express();

export default function(parameters) {
    Raven.config('https://2aad6397f8c1403ca2736bce7539f13c@sentry.io/157100').install();
    app.use(Raven.requestHandler());

    app.use(express.static(path.join(__dirname, '../client')))

    app.get('/*', function (req, res) {
        res.send(
            renderPage(req.path)
        )
    });

    app.use(Raven.errorHandler());

    app.listen(3000, function () {
        console.log('Example app listening on port 3000!')
    });
}
