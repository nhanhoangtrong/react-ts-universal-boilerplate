import * as React from 'react';
import { Route, Redirect } from 'react-router';

export interface RedirectWithStatusProps {
    from?: string;
    to?: string;
    status?: number;
}

export default ({ from, to, status }: RedirectWithStatusProps) => (
    <Route
        render={({ staticContext }) => {
            if (staticContext) {
                staticContext.status = status;
            }
            return <Redirect from={from} to={to} />;
        }}
    />
);
