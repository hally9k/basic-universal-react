require('babel-register');
const Raven = require('raven');
const getDom = require('./app/app.js');

const app = require('express')();

Raven.config('https://2aad6397f8c1403ca2736bce7539f13c@sentry.io/157100').install();
app.use(Raven.requestHandler());

app.get('/*', function (req, res) {
    res.send(
        getDom.default(req.path)
    )
})

app.use(Raven.errorHandler());

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
