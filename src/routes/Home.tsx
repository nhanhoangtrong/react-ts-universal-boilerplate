import * as React from 'react';
import { Switch, Route } from 'react-router';

import MainAppContainer from '../containers/MainAppContainer';
import TodoAppContainer from '../containers/TodoAppContainer';
import NotFound from '../components/NotFound';

export default () => (
    <Switch>
        <Route exact path="/" component={MainAppContainer} />
        <Route path="/todo" component={TodoAppContainer} />
        <Route component={NotFound} />
    </Switch>
);
