import { handleActions } from 'redux-actions';
import * as ActionTypes from '../types';

const initialState: GlobalState = {
    filter: ActionTypes.SHOW_ALL,
    isLoading: true,
};

export default (
    state: GlobalState = initialState,
    action: ReduxActions.Action<any>
) => {
    switch (action.type) {
        case ActionTypes.SET_FILTER:
            return {
                ...state,
                filter: action.payload,
            };
        case ActionTypes.TOGGLE_LOADING:
            return {
                ...state,
                isLoading: !state.isLoading,
            };
        default:
            return state;
    }
};
