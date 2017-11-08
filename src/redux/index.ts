import { Store, Dispatch } from 'redux';
import { RootState } from './reducers';
import { History } from 'history';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';

export type RootStore = Store<RootState>;
export type RootDispatch = Dispatch<RootState>;
export type RootState = RootState;

/* tslint:disable:no-var-requires */
export const configureStore = (process.env.NODE_ENV === 'development' ? require('./configureStore.dev').default : require('./configureStore.prod').default) as (history?: History, initialState?: RootState) => Store<RootState>;

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__ || {}),
    link: new HttpLink({
        uri: '/graphql',
    }),
});
