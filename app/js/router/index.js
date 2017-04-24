import ContentPage from '../pages/content-page.container';
import React from 'react';
import { Route } from 'react-router';

export default <div>
                   <Route path="*" component={ContentPage} />
               </div>;
