import * as React from 'react';
import { Route } from 'react-router';

export interface StatusProps {
    code?: number;
    children?: React.ReactChild;
}

export default ({ code, children }: StatusProps) => (
    <Route render={ ({ staticContext }) => {
        if (staticContext) {
            staticContext.status = code;
        }
        return children;
    }} />
);
