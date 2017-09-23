import * as React from 'react';
// <reference path="./index.d.ts" />
import * as classNames from 'classnames';
import * as styles from './style.styl';
import { ActionFunction1, Action } from "redux-actions";

export interface InputTodoProps extends React.Props<any> {
    text?: string;
    placeholder?: string;
    editing?: boolean;
    focus?: boolean;
    onSave(text: string): any;
    onCancel?(): any;
}

export interface InputTodoState extends React.ComponentState {
    text: string;
}

export default class InputTodo extends React.Component<InputTodoProps, InputTodoState> {
    public constructor(props?: InputTodoProps, context?: any) {
        super(props, context);
        this.state = {
            text: this.props.text || '',
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    public render() {
        const classes = classNames({
            [styles.inputTodo]: true,
            [styles.editing]: this.props.editing,
            [styles.newTodo]: !this.props.editing,
        });
        return (
            <input
                autoFocus={this.props.focus || false}
                className={classes}
                placeholder={this.props.placeholder}
                type="text"
                value={this.state.text}
                onChange={this.handleTextChange}
                onKeyUp={this.handleKeyUp} />
        );
    }

    public componentWillReceiveProps(nextProps: Readonly<InputTodoProps>, nextContext: any) {
        if (nextProps.text) {
            this.setState({
                text: nextProps.text,
            });
        }
    }

    private handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            text: e.target.value,
        });
    }

    private handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        const text = e.currentTarget.value.trim();
        if (e.which === 13) {
            this.props.onSave(text);
            if (text && !this.props.editing) {
                this.setState({
                    text: '',
                });
            }
        } else if (e.which === 27) {
            if (this.props.onCancel) {
                this.props.onCancel();
            } else {
                this.setState({
                    text: '',
                });
            }
        }
    }
}
