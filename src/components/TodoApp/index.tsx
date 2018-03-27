import * as React from 'react';
import * as styles from './style.styl';
import * as classNames from 'classnames';
import { Route, RouteComponentProps } from 'react-router';
import NavBar from '../NavBar';

import InputTodo from '../InputTodo';
import TodoList from '../TodoList';
import LoadingIndicator from '../LoadingIndicator';

export interface TodoAppProps extends RouteComponentProps<any> {
    isLoading: boolean;
    filter: TodoFilterType;
    globalsActions: any;
    todosActions: any;
    todos: ITodoItem[];
}

export default class TodoApp extends React.Component<TodoAppProps> {
    constructor(props?: TodoAppProps, context?: any) {
        super(props, context);
    }

    public render() {
        const { match } = this.props;
        return (
            <div className={styles.todoApp}>
                <h1>
                    Hello, filter is {this.props.filter} and isLoading is{' '}
                    {this.props.isLoading ? 'true' : 'false'}!{' '}
                    <button onClick={this.props.globalsActions.waitLoading}>
                        toggle
                    </button>
                </h1>
                <TodoList
                    todos={this.props.todos}
                    addTodo={this.props.todosActions.addTodo}
                />
                <LoadingIndicator visible={this.props.isLoading} />
                <NavBar />
            </div>
        );
    }
}
