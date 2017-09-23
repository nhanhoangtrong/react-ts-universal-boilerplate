import { createAction } from 'redux-actions';
import * as ActionTypes from '../types';

export const addTodo = createAction<TodoItemData>(ActionTypes.ADD_TODO);
export const editTodo = createAction<TodoItemData>(ActionTypes.EDIT_TODO);
export const deleteTodo = createAction<TodoItemId>(ActionTypes.DELETE_TODO);
export const completeTodo = createAction<TodoItemId>(ActionTypes.COMPLETE_TODO);
export const completeAll = createAction(ActionTypes.COMPLETE_ALL);
export const clearCompleted = createAction(ActionTypes.CLEAR_COMPLETED);
