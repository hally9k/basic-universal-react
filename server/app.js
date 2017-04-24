import { ENDPOINTS } from '../config/api';
import fetch from '../app/js/utilities/fetch';
import getApp from '../app/js/app';
import ReactDOMServer from 'react-dom/server';

function renderPage(url, callback) {
    fetch(ENDPOINTS.PAGES).then((page) => {
        const initialStateHydration = { root: { page } };
        const app = getApp('server', url, initialStateHydration);
        const dom = renderPartial(app);
        callback(`<html>
                    <head>
                        <title>Auckland Zoo</title>
                    </head>
                    <body>
                        <div id="root">${dom}</div>
                        <script>
                            window.__INITIAL_STATE__ = ${JSON.stringify(initialStateHydration)}
                        </script>
                        <script src="app.js"></script>
                    </body>
                </html>`
            );
    });
}

function renderPartial(component) {
    return ReactDOMServer.renderToString(component);
}

export default renderPage;
