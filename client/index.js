import getApp from '../app/js/app';
import { render } from 'react-dom';
/*
    Ensure polyfills only load on older browsers
 */
// Covers all IE versions and Safari < 11
const browserSupportsAllFeatures = window.Promise && window.fetch;

if (browserSupportsAllFeatures) {
    initialise();
} else {
    // See 'Code Splitting' documentation for Webpack (https://webpack.js.org/guides/code-splitting-require/#dependencies)
    require.ensure([], function() {
        require('./polyfills.js');
        initialise();
    });
}

// /*
//     Main function
//  */
function initialise() {
    const app = getApp('client', null, window.__INITIAL_STATE__); // eslint-disable-line
    render(app, document.getElementById('root'));
}
