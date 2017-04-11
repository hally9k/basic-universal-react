import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Home from './pages/home.jsx';
import About from './pages/about.jsx';
import FourOhFour from './pages/error/FourOhFour.jsx';

const renderPage = (route) => {
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
};

const renderPartial = (component) => {
    return ReactDOMServer.renderToString(component);
}

const resolveReactElement = (route) => {
    let partial;
    switch(route) {
        case '/home':
            return <Home />;
        case '/about':
            return <About />;
        default:
            return <FourOhFour />;
    }
}

export default renderPage;
