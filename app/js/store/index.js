import canUseDom from '../utilities/dom';
import { createEpicMiddleware } from 'redux-observable';
import epics from '../epics';
import logger from '../middleware/logger-middleware';
import reducers from '../reducers';
import {
    applyMiddleware,
    compose,
    createStore } from 'redux';

let composeEnhancers, store;

if (canUseDom()) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line no-underscore-dangle
} else {
    composeEnhancers = compose;
}

const epicMiddleware = createEpicMiddleware(epics);

const enhancer = composeEnhancers(
    applyMiddleware(epicMiddleware, logger)
 );

export function configureStore(hydration) { // eslint-disable-line
    store = createStore(reducers, hydration, enhancer);
    return store;
}

export { store };
