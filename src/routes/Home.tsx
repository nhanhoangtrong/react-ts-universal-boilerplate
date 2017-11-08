import * as React from 'react';
import { Switch, Route } from 'react-router';

import MainAppContainer from '../containers/MainAppContainer';
import TodoAppContainer from '../containers/TodoAppContainer';
import NotFound from '../components/NotFound';
import UserInfo from '../containers/UserInfo';

export default () => (
    <Switch>
        <Route exact path="/" component={MainAppContainer} />
        <Route path="/todo" component={TodoAppContainer} />
        <Route exact path="/user" component={UserInfo} />
        <Route path="/user/:id" component={UserInfo} />
        <Route component={NotFound} />
    </Switch>
);
