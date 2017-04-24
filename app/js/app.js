import { BrowserRouter } from 'react-router-dom';
import { configureStore } from './store';
import { Provider } from 'react-redux';
import React from 'react';
import Routes from './router';
import {
    StaticRouter
} from 'react-router';
import 'rxjs';
import '../sass/index';

export default function getApp(context, location, hydration) {
    const reduxStore = configureStore(hydration);

    const Router = {
        server: StaticRouter,
        client: BrowserRouter
    }[context];

    const routerContext = {};

    const routerProps = {
        server: { context: routerContext, location },
        client: { }
    }[context];

    const app =  <Provider store={reduxStore}>
                      <Router {...routerProps}>
                        {Routes}
                    </Router>
                 </Provider>;

    return app;
}
