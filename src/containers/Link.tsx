import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { RootDispatch } from '../redux';
import { push } from 'react-router-redux';

export interface LinkOwnProps extends React.AnchorHTMLAttributes<any> {
    to?: string;
    children?: React.ReactNode[] | string;
}

export interface LinkDispatchProps extends React.Props<any> {
    pushTo: any;
}

export type LinkProps = LinkOwnProps & LinkDispatchProps;

const mapDispatchToProps = (dispatch: RootDispatch) => ({
    pushTo: bindActionCreators(push, dispatch),
});

export default connect<null, LinkDispatchProps, LinkOwnProps>(
    null,
    mapDispatchToProps
)(({ to, children, pushTo, ...props }: LinkProps) => {
    return (
        <a
            href={to}
            onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                pushTo(to);
            }}
            {...props}>
            {children}
        </a>
    );
});
