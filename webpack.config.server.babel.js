import configuration from './webpack.config';
import { server } from 'universal-webpack/config';
import settings from './universal-webpack-settings';

export default server(configuration, settings);
