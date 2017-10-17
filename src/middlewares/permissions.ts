import * as express from 'express';
import * as passport from 'passport';
import * as _ from 'lodash';
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';
import { BearerAuthenticationError } from './passport';

export class NotHavePermissionError extends Error {
    constructor(...args: any[]) {
        super(...args);
        this.name = 'NotHavePermission';

        // Fixing instanceof operator
        // when extending built-ins that target ES5
        Object.setPrototypeOf(this, NotHavePermissionError.prototype);
    }
}

export const checkPermissions: (requiredPermissions: string | string[]) => ((req: express.Request, res: express.Response, next: express.NextFunction) => void) = (requiredPermissions) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!req.user) {
            return next(new BearerAuthenticationError('User must be authenticated before checking.'));
        }

        // Pre-format required permisisons
        if (typeof requiredPermissions === 'string') {
            requiredPermissions = requiredPermissions.trim().split(' ');
        }

        // After user has been checked, let's check the scope
        const scope = req.user.scope;
        if (!scope || typeof scope !== 'string') {
            return next(new NotHavePermissionError('Permissions scope not available.'));
        }
        const scopePermissions = scope.trim().split(' ');
        if (!Array.isArray(scopePermissions)) {
            return next(new NotHavePermissionError('Permissions must be an array or string'));
        }

        // Now check the permissions by intersection two sets
        const sufficient = requiredPermissions.every((permission) => {
            return scopePermissions.includes(permission);
        });

        if (!sufficient) {
            return next(new NotHavePermissionError('Permissions denied.'));
        }

        return next();
    };
};

export const checkAdmin = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (!req.user) {
        return next(new BearerAuthenticationError('User must be authenticated before checking.'));
    }

    if (!req.user.admin) {
        return next(new NotHavePermissionError('Administrator only, permissions denied.'));
    }

    return next();
};
