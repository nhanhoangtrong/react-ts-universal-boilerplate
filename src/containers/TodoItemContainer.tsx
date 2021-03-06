import * as React from 'react';
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';
import TodoItem from '../components/TodoItem';
import { Store, Dispatch, bindActionCreators } from 'redux';
import { editTodo, completeTodo, deleteTodo } from '../redux/actions/todos';
import { RootState } from '../redux';

export interface TodoItemContainerDispatchProps extends React.Props<any> {
    completeTodo: ReduxActions.ActionFunction1<
        string,
        ReduxActions.Action<string>
    >;
    deleteTodo: ReduxActions.ActionFunction1<
        string,
        ReduxActions.Action<string>
    >;
    editTodo: ReduxActions.ActionFunction1<
        ITodoItem,
        ReduxActions.Action<ITodoItem>
    >;
}

export interface TodoItemContainerOwnProps extends React.Props<any> {
    todo: ITodoItem;
}

export type TodoItemContainerProps = TodoItemContainerOwnProps &
    TodoItemContainerDispatchProps;

const mapDispatchToProps = (dispatch: Dispatch<RootState>) => ({
    completeTodo: bindActionCreators(completeTodo, dispatch),
    deleteTodo: bindActionCreators(deleteTodo, dispatch),
    editTodo: bindActionCreators(editTodo, dispatch),
});

export default connect<
    null,
    TodoItemContainerDispatchProps,
    TodoItemContainerOwnProps
>(null, mapDispatchToProps)(TodoItem);
