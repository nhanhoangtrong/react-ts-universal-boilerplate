import { Store, Dispatch } from 'redux';
import { RootState } from './reducers';
import { History } from 'history';

export type RootStore = Store<RootState>;
export type RootDispatch = Dispatch<RootState>;
export type RootState = RootState;

/* tslint:disable:no-var-requires */
export const configureStore = (process.env.NODE_ENV !== 'production' ? require('./configureStore.dev').default : require('./configureStore.prod').default) as (history?: History, initialState?: RootState) => Store<RootState>;
