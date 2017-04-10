import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Home from './pages/home.jsx';
import FourOhFour from './pages/error/FourOhFour.jsx';


const getDom = (route) => {
    const component = resolveReactElement(route);
    const partial = render(component);
    return `<html>
        <head>
            <title>Auckland Zoo</title>
        </head>
        <body>
            ${partial}
        </body>
    </html>`;
};

const render = (component) => {
    return ReactDOMServer.renderToString(component);
}

const resolveReactElement = (route) => {
    switch(route) {
        case '/home':
            return <Home />;
        default:
            return <FourOhFour />;
    }
}

export default getDom;
