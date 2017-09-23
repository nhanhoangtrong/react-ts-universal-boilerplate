import * as React from 'react';
import TodoItemContainer from '../../containers/TodoItemContainer';
import * as styles from './style.styl';
import InputTodo from '../InputTodo';

export interface TodoListProps extends React.Props<any> {
    todos: TodoItemData[];
    addTodo: (todo: TodoItemData) => any;
}

export default class TodoList extends React.Component<TodoListProps> {
    constructor(props?: TodoListProps, context?: any) {
        super(props, context);
        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

    public render() {
        return (
            <ul className={styles.todoList}>
                {this.props.todos.map((todo, i) => {
                    return <TodoItemContainer key={todo.id} todo={todo} />;
                })}
                <li><InputTodo onSave={this.handleAddTodo} placeholder="Input todo text" /></li>
            </ul>
        );
    }

    private handleAddTodo(text: string) {
        this.props.addTodo({text});
    }
}
