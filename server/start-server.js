import configuration from '../webpack.config';
import settings from '../universal-webpack-settings';
import startServer from 'universal-webpack/server';
// `configuration.context` and `configuration.output.path` are used

startServer(configuration, settings);
