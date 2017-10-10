import { combineReducers, Reducer } from 'redux';
import { routerReducer, RouterState } from 'react-router-redux';
import todos from './todos';
import globals from './globals';

export interface RootState {
    todos?: TodoItemState;
    globals?: GlobalState;
    router?: RouterState;
}

export default combineReducers<RootState>({
    todos,
    globals,
    router: routerReducer,
});
