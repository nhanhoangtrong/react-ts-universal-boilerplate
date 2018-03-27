import * as React from 'react';
import * as classNames from 'classnames';
import * as styles from './style.styl';
import InputTodo from '../InputTodo';
import { TodoItemContainerProps } from '../../containers/TodoItemContainer';
import { Motion, spring } from 'react-motion';

export type TodoItemProps = TodoItemContainerProps;

export interface TodoItemState extends React.ComponentState {
    isEditing: boolean;
    startStyle: any;
    finalStyle: any;
    deleting: boolean;
}

export default class TodoItem extends React.Component<
    TodoItemProps,
    TodoItemState
> {
    constructor(props?: TodoItemProps, context?: any) {
        super(props, context);
        this.state = {
            isEditing: false,
            startStyle: {
                width: 0,
                height: 0,
                opacity: 0,
            },
            finalStyle: {
                width: 400,
                height: 40,
                opacity: 1.0,
            },
            deleting: false,
        };
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleRemoveClick = this.handleRemoveClick.bind(this);
        this.handleEditCancel = this.handleEditCancel.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
    }

    public render() {
        const { todo } = this.props;
        return (
            <Motion
                defaultStyle={{
                    ...this.state.startStyle,
                }}
                style={{
                    width: spring(this.state.finalStyle.width, {
                        stiffness: 220,
                        damping: 40,
                    }),
                    height: spring(this.state.finalStyle.height, {
                        stiffness: 220,
                        damping: 40,
                    }),
                    opacity: spring(this.state.finalStyle.opacity, {
                        stiffness: 150,
                    }),
                }}
                onRest={() => {
                    if (this.state.deleting) {
                        this.props.deleteTodo(this.props.todo.id);
                    }
                }}>
                {(interpolatingStyle) => {
                    return this.state.isEditing ? (
                        <li
                            className={styles.todoItem}
                            style={interpolatingStyle}>
                            <InputTodo
                                text={todo.text}
                                editing={true}
                                onSave={this.handleEditSubmit}
                                onCancel={this.handleEditCancel}
                                focus={true}
                            />
                        </li>
                    ) : (
                        <li
                            className={styles.todoItem}
                            style={{
                                ...interpolatingStyle,
                                display:
                                    interpolatingStyle.width < 20
                                        ? 'none'
                                        : 'block',
                            }}>
                            {this.state.deleting ? null : (
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={todo.completed}
                                        onChange={this.handleCheckChange}
                                    />
                                    &nbsp;
                                    {todo.text}
                                    &nbsp;
                                    {interpolatingStyle.width > 300 ? (
                                        <button onClick={this.handleEditClick}>
                                            edit
                                        </button>
                                    ) : null}
                                    {interpolatingStyle.width > 300 ? (
                                        <button
                                            onClick={this.handleRemoveClick}>
                                            remove
                                        </button>
                                    ) : null}
                                </div>
                            )}
                        </li>
                    );
                }}
            </Motion>
        );
    }

    private handleCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.props.completeTodo(this.props.todo.id);
    }

    private handleEditClick(e: React.MouseEvent<HTMLButtonElement>) {
        this.setState({
            isEditing: true,
        });
    }

    private handleEditCancel() {
        this.setState({
            isEditing: false,
        });
    }

    private handleEditSubmit(text: string) {
        this.props.editTodo({
            ...this.props.todo,
            text,
        });
        this.setState({
            isEditing: false,
        });
    }

    private handleRemoveClick(e: React.MouseEvent<HTMLButtonElement>) {
        // this.props.deleteTodo(this.props.todo.id);
        this.setState({
            startStyle: {
                ...this.state.finalStyle,
            },
            finalStyle: {
                ...this.state.startStyle,
            },
            deleting: true,
        });
    }
}
