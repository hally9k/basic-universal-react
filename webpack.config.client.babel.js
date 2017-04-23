import { client } from 'universal-webpack/config';
import configuration from './webpack.config';
import settings from './universal-webpack-settings';

export default client(configuration, settings);
