const path = require('path');
const rootFolder = path.resolve(`${__dirname}/..`);

const paths = {
    root: path.resolve(rootFolder),
    appRoot: path.resolve(rootFolder, 'app'),
    appJs: path.resolve(rootFolder, 'app/js'),
    htmlTemplate: path.resolve(rootFolder, 'static/index.html'),
    staticFiles: path.resolve(rootFolder, 'build/client')
};

export default paths;
