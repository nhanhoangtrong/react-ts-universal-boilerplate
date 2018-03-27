import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { RootDispatch, RootState } from '../redux';
import MainApp from '../components/MainApp';

export interface MainAppContainerStateProps {
    isLoading: boolean;
}

export interface MainAppContainerDispatchProps {
    push: any;
}

export interface MainAppContainerOwnProps {
    params?: any;
}

export type MainAppContainerProps = MainAppContainerStateProps &
    MainAppContainerDispatchProps &
    MainAppContainerOwnProps;

const mapStateToProps = (state: RootState) => ({
    isLoading: state.globals.isLoading,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
    push: bindActionCreators(push, dispatch),
});

export default connect<
    MainAppContainerStateProps,
    MainAppContainerDispatchProps,
    null
>(mapStateToProps, mapDispatchToProps)(MainApp);
