import * as React from 'react';
import { MainAppContainerProps } from '../containers/MainAppContainer';

export type MainAppProps = MainAppContainerProps;

export default class MainApp extends React.Component<MainAppContainerProps, {}> {
    constructor(props?: any, context?: any) {
        super(props, context);
        this.onClickGoTodo = this.onClickGoTodo.bind(this);
    }

    public render() {
        return (
            <div>
                <h1>Default global: {this.props.isLoading ? 'true' : 'false'}</h1>
                <button type="button" onClick={this.onClickGoTodo}>Request Todo App { this.props.params ? this.props.params.id : '' }</button>
            </div>
        );
    }

    private onClickGoTodo(e: React.MouseEvent<HTMLButtonElement>) {
        this.props.push('/todo');
    }
}
