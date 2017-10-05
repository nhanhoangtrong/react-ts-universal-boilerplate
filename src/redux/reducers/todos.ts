import { handleActions } from 'redux-actions';
import { v1 as uuidv1 } from 'uuid';
import * as ActionTypes from '../types';

const initialState: TodoItemData[] = [{
    id: uuidv1(),
    text: 'Default todo again',
    completed: false,
}];

export default handleActions<TodoStoreState, TodoItemData>({
    [ActionTypes.ADD_TODO]: (state, action) => {
        return [{
            id: uuidv1(),
            completed: false,
            ...action.payload,
        }, ...state];
    },

    [ActionTypes.DELETE_TODO]: (state, action) => {
        return state.filter((todo: TodoItemData) => todo.id !== action.payload);
    },

    [ActionTypes.EDIT_TODO]: (state, action) => {
        return state.map((todo) => {
            return todo.id === action.payload.id ? {
                ...todo,
                text: action.payload.text,
            } : todo;
        });
    },

    [ActionTypes.COMPLETE_TODO]: (state, action) => {
        return state.map((todo) => {
            return todo.id === action.payload ? {
                ...todo,
                completed: !todo.completed,
            } : todo;
        });
    },

    [ActionTypes.COMPLETE_ALL]: (state, action) => {
        const allAreMarked = state.every((todo) => todo.completed);
        return state.map((todo) => ({
            ...todo,
            completed: !allAreMarked,
        }));
    },

    [ActionTypes.CLEAR_COMPLETED]: (state, action) => {
        return state.filter((todo) => todo.completed === false);
    },
}, initialState);
