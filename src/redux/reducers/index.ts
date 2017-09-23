import { combineReducers, Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import todos from './todos';
import globals from './globals';

export interface RootState {
    todos: TodoStoreState;
    globals: GlobalStoreState;
    router: RouterState;
}

export default combineReducers<RootState>({
    todos,
    globals,
    router: routerReducer,
});
