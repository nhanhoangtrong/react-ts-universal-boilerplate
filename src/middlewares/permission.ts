import * as express from 'express';
import * as passport from 'passport';
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

export class NotHavePermissionError extends Error {
    constructor(...args: any[]) {
        super(...args);
        this.name = 'NotHavePermission';

        // Fixing instanceof operator
        // when extending built-ins that target ES5
        Object.setPrototypeOf(this, NotHavePermissionError.prototype);
    }
}

export const permission: (role: string) => ((req: express.Request, res: express.Response, next: express.NextFunction) => void) = (role) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (!req.user) {
            return next(new NotHavePermissionError('User must be authenticated.'));
        }
        const user = req.user;
        if (user.role !== role) {
            return next(new NotHavePermissionError('User does not have permissions'));
        }
        return next();
    };
};
