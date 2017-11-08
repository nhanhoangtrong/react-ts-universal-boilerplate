import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { History } from 'history';
import HomeRoute from '../routes/Home';
import { RootStore } from '../redux';

export interface AppProps {
    store: RootStore;
    history: History;
    client: any;
}

export type AppRootComponent = React.StatelessComponent<AppProps>;

export default (props: AppProps) => {
    return (
        <ApolloProvider client={props.client}>
            <Provider store={props.store}>
                <ConnectedRouter history={props.history}>
                    <HomeRoute />
                </ConnectedRouter>
            </Provider>
        </ApolloProvider>
    );
};
