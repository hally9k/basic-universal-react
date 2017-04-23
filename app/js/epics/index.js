import { combineEpics } from 'redux-observable';
import root from './root/root-epics';

export default combineEpics(root);
