const paths = require('./config/paths').default;
// const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssCustomProperties = require('postcss-custom-properties');
const postcssCalc = require('postcss-calc');

const configuration = {
    // Resolve all relative paths from the project root folder
    context: paths.root,

    // Each "entry" can be divided into multiple chunks.
    // Why multiple "entries" might be used?
    // For example, for completely different website parts,
    // like the public suser-facing part and the private "admin" part.
    entry:
    {
        // The "main" entry
        app: './client/index.js'
    },

    output:
    {
        // Filesystem path for static files
        path: paths.staticFiles,

        // Network path for static files
        publicPath: '/client/',

        // Specifies the name of each output entry file
        filename: '[name].js',
        // filename: '[name].[hash].js',

        // Specifies the name of each (non-entry) chunk file
        chunkFilename: '[name].js'
        // chunkFilename: '[name].[hash].js'
    },
    devtool: 'source-map',
    module:
    {
        rules:
        [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use:
            [{
                loader: 'babel-loader'
            }]
        },
        {
            test: /\.(scss)$/,
            use:
            [{
                loader: 'style-loader'
            },
            {
                loader : 'css-loader',
                options:
                {
                    importLoaders : 2,
                    sourceMap     : true
                }
            },
            {
                loader : 'postcss-loader'
            },
            {
                loader : 'sass-loader',
                options:
                {
                    outputStyle       : 'expanded',
                    sourceMap         : true,
                    sourceMapContents : true
                }
            }]
        },
        {
            test: /\.(css)$/,
            use:
            [{
                loader: 'style-loader'
            },
            {
                loader : 'css-loader',
                options:
                {
                    importLoaders : 2,
                    sourceMap     : true
                }
            },
            {
                loader : 'postcss-loader'
            }]
        },
        {
            test: /\.(jpg|png)$/,
            use:
            [{
                loader : 'url-loader',
                options:
                {
                    limit: 10240 // Any png-image or woff-font below or equal to 10K will be converted to inline base64 instead
                }
            }]
        },
        {
            test: /\.(svg)$/,
            use:
            [{
                loader: 'svg-react-loader'
            }]
        }]
    },
    plugins: [],
    resolve: {
        extensions: ['.css', '.js', '.json', '.jsx', '.scss']
        // modules: [
        //     path.resolve(__dirname, 'app/js'),
        //     'node_modules'
        // ]
        // alias: {
        //     actions: path.resolve(__dirname, '../app/js/actions'),
        //     components: path.resolve(__dirname, '../app/js/components'),
        //     epics: path.resolve(__dirname, '../app/js/epics'),
        //     middleware: path.resolve(__dirname, '../app/js/middleware'),
        //     modules: path.resolve(__dirname, '../app/js/modules'),
        //     reducers: path.resolve(__dirname, '../app/js/reducers'),
        //     router: path.resolve(__dirname, '../app/js/router'),
        //     selectors: path.resolve(__dirname, '../app/js/selectors'),
        //     store: path.resolve(__dirname, '../../app/js/store'),
        //     tests: path.resolve(__dirname, '../app/js/tests'),
        //     utilities: path.resolve(__dirname, '../app/js/utilities')
        // }
    },
};

configuration.plugins.push(
    new webpack.LoaderOptionsPlugin({
        test: /\.(scss|css)$/,
        debug: true,
        options:
        {
            // A temporary workaround for `scss-loader`
            // https://github.com/jtangelder/sass-loader/issues/298
            output:
            {
                path: configuration.output.path
            },

            postcss:
            [
                autoprefixer({ browsers: 'last 2 version' }),
                cssCustomProperties(),
                postcssCalc()
            ],

            // A temporary workaround for `css-loader`.
            // Can also supply `query.context` parameter.
            context: configuration.context
        }
    })
);

module.exports = configuration;
