import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../redux/reducers';
import { RootDispatch } from '../redux';
import TodoApp from '../components/TodoApp';
import * as GlobalsActions from '../redux/actions/globals';
import * as TodosActions from '../redux/actions/todos';

export interface TodoAppContainerStateProps extends React.Props<any> {
    filter: TodoFilterType;
    isLoading: boolean;
    todos: ITodoItem[];
}

export interface TodoAppContainerDispatchProps extends React.Props<any> {
    globalsActions: any;
    todosActions: any;
}

export type TodoAppContainerProps = TodoAppContainerStateProps &
    TodoAppContainerDispatchProps;

const mapStateToProps = (state: RootState) => {
    const filter = state.globals.filter;
    const todos = state.todos.filter((todo) => {
        return true;
    });
    return {
        filter,
        isLoading: state.globals.isLoading,
        todos,
    };
};

const mapDispatchToProps = (dispatch: RootDispatch) => ({
    globalsActions: bindActionCreators(GlobalsActions as any, dispatch),
    todosActions: bindActionCreators(TodosActions as any, dispatch),
});

export default connect<
    TodoAppContainerStateProps,
    TodoAppContainerDispatchProps,
    {}
>(mapStateToProps, mapDispatchToProps)(TodoApp);
