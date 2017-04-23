import { combineReducers } from 'redux';
import ping from './root/ping/ping-reducers';
import root from './root/root-reducers';


export default combineReducers({
    root,
    ping
});
