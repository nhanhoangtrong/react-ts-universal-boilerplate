import { createAction } from 'redux-actions';
import * as ActionTypes from '../types';
import { RootDispatch } from '../';

export const toggleLoading = createAction(ActionTypes.TOGGLE_LOADING);
export const setFilter = createAction<TodoFilterType>(ActionTypes.SET_FILTER);
export const waitLoading = () => {
    console.log('is waiting');
    return (dispatch: RootDispatch) => {
        setTimeout(() => {
            console.log('it worked!');
            dispatch(toggleLoading());
        }, 1000);
    };
};
