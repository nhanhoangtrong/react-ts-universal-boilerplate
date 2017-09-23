import { createStore, Store } from 'redux';
import rootReducer, { RootState } from './reducers';
import enhancer from './enhancer';
import { History } from 'history';
import { routerMiddleware } from 'react-router-redux';

export default (history?: History, initialState?: RootState): Store<RootState> => {
    const newEnhancer = enhancer(routerMiddleware(history));
    return createStore(rootReducer, initialState, newEnhancer);
};
