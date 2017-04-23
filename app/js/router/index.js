import Ping from '../modules/root/ping/ping-container';
import React from 'react';
import Root from '../modules/root/root-container';
import { Route } from 'react-router';

export default <div>
                    <Route path="/" exact render={ () => <h1>Root</h1> }></Route>
                    <Route path="/github" component={Root}></Route>
                    <Route path="/ping" component={Ping}></Route>
                </div>;
