export const ADD_TODO = 'ADD_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const COMPLETE_ALL = 'COMPLETE_ALL';
export const CLEAR_COMPLETED = 'CLEAR_COMPLETED';

export const SET_FILTER = 'SET_FILTER';
export const TOGGLE_LOADING = 'TOGGLE_LOADING';

export const SHOW_ALL: TodoFilterType = 'SHOW_ALL';
export const SHOW_ACTIVE: TodoFilterType = 'SHOW_ACTIVE';
export const SHOW_COMPLETED: TodoFilterType = 'SHOW_COMPLETED';
export const KEY: string = 'filter';
export const FILTER_TYPES = [
    SHOW_ALL,
    SHOW_ACTIVE,
    SHOW_COMPLETED,
];
