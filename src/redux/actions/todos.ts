import { createAction } from 'redux-actions';
import * as ActionTypes from '../types';

export const addTodo = createAction<ITodoItem>(ActionTypes.ADD_TODO);
export const editTodo = createAction<ITodoItem>(ActionTypes.EDIT_TODO);
export const deleteTodo = createAction<string>(ActionTypes.DELETE_TODO);
export const completeTodo = createAction<string>(ActionTypes.COMPLETE_TODO);
export const completeAll = createAction(ActionTypes.COMPLETE_ALL);
export const clearCompleted = createAction(ActionTypes.CLEAR_COMPLETED);
