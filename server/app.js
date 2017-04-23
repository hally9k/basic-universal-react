import getApp from '../app/js/app';
import ReactDOMServer from 'react-dom/server';

function renderPage(url, callback) {
    const app = getApp('server', url);
    const dom = renderPartial(app);
    callback(`<html>
                <head>
                    <title>Auckland Zoo</title>
                </head>
                <body>
                    <div id="root">${dom}</div>
                    <script src="app.js"></script>
                </body>
            </html>`
        );
}

function renderPartial(component) {
    return ReactDOMServer.renderToString(component);
}

export default renderPage;
