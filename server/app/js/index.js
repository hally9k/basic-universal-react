import About from './pages/about.jsx';
import FourOhFour from './pages/error/FourOhFour.jsx';
import Home from './pages/home.jsx';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

function renderPage(route) {
    const component = resolveReactElement(route);
    const partial = renderPartial(component);
    return `<html>
        <head>
            <title>Auckland Zoo</title>
        </head>
        <body>
            ${partial}
        </body>
    </html>`;
}

function renderPartial(component) {
    return ReactDOMServer.renderToString(component);
}

function resolveReactElement(route) {
    switch (route) {
        case '/home':
            return <Home />;
        case '/about':
            return <About />;
        default:
            return <FourOhFour />;
    }
}

export default renderPage;
