import * as React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { History } from 'history';
import HomeRoute from '../routes/Home';
import { RootStore } from '../redux';

export interface AppProps {
    store: RootStore;
    history: History;
}

export type AppRootComponent = React.StatelessComponent<AppProps>;

export default (props: AppProps) => {
    return (
        <Provider store={props.store}>
            <ConnectedRouter history={props.history}>
                <HomeRoute />
            </ConnectedRouter>
        </Provider>
    );
};
