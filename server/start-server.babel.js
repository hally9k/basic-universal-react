// Enable ES6
// (ignoring all `build` and `node_modules` folders for speed-up)
require('babel-register')({ ignore: /\/(build|node_modules)\// });

// Run `source/start-server.js`
require('./start-server.js');
