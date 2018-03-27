import { createStore, Reducer, Store } from 'redux';
import rootReducer, { RootState } from './reducers';
import enhancer from './enhancer';
import { routerMiddleware } from 'react-router-redux';
import { History } from 'history';

export default (
    history?: History,
    initialState?: RootState
): Store<RootState> => {
    let create;
    /* tslint:disable:prefer-conditional-expression */
    if (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__) {
        create = window.__REDUX_DEVTOOLS_EXTENSION__()(createStore);
    } else {
        create = createStore;
    }

    const newEnhancer = enhancer(routerMiddleware(history));

    const createStoreWithMiddleware = newEnhancer(create);

    const store = createStoreWithMiddleware(rootReducer, initialState) as Store<
        RootState
    >;

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            console.log('Replacing root reducer...');
            const nextReducer = require('./reducers').default as Reducer<
                RootState
            >;
            store.replaceReducer(nextReducer);
            console.log('Root reducer has been replaced');
        });
    }

    return store;
};
