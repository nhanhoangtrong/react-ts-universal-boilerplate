import * as React from 'react';
import * as styles from './style.styl';
import Transition from 'react-transition-group/Transition';

export interface LoadingIndicatorProps extends React.Props<any> {
    visible: boolean;
    duration?: number;
}

const defaultStyle = {
    transition: 'opacity 500ms ease-in-out',
    opacity: 0,
};

const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
};

export default class LoadingIndicator extends React.Component<
    LoadingIndicatorProps,
    any
> {
    constructor(props?: LoadingIndicatorProps, context?: any) {
        super(props, context);
        this.state = {
            in: this.props.visible,
        };
        this.onTransitionEntered = this.onTransitionEntered.bind(this);
        this.onTransitionExited = this.onTransitionExited.bind(this);
    }

    public render() {
        return (
            <Transition
                in={this.state.in && this.props.visible}
                timeout={500}
                onEntered={this.onTransitionEntered}
                onExited={this.onTransitionExited}>
                {(state: 'entered' | 'entering') => (
                    <div
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state],
                            display: this.props.visible ? 'block' : 'none',
                        }}>
                        Loading...
                    </div>
                )}
            </Transition>
        );
    }

    private onTransitionEntered(node: HTMLElement, isAppearing: boolean) {
        if (!isAppearing) {
            this.setState({
                in: false,
            });
        }
    }

    private onTransitionExited(node: HTMLElement) {
        this.setState({
            in: true,
        });
    }
}
