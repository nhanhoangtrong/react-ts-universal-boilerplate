import * as express from 'express';
import * as passport from 'passport';
import { JsonWebTokenError, TokenExpiredError, NotBeforeError } from 'jsonwebtoken';

export const permission: (role: string) => ((req: express.Request, res: express.Response, next: express.NextFunction) => void) = (role) => {
    return (req: express.Request, res: express.Response, next: express.NextFunction) => {
        passport.authenticate('bearer', {
            session: false,
        }, (err: Error, user: any) => {

            if (err) {
                if (err.name === 'UserNotFound') {
                    // Send a Unauthorized status
                    return res.status(401).send();
                } else if (err instanceof TokenExpiredError) {
                    // Send a Gone status
                    return res.status(410).send(err.expiredAt);
                } else if (err instanceof NotBeforeError) {
                    // Send a Gone status
                    return res.status(410).send(err.date);
                } else if (err instanceof JsonWebTokenError) {
                    // Send a Bad Request status
                    return res.status(400).send(err.inner);
                }

                // Send a Internal Server Error status
                return res.status(500).send();
            }

            if (user.role !== role) {
                console.log('user role', user.role, 'role', role);
                return res.status(403).send();
            }
            req.user = user;
            return next();

        })(req, res, next);
    };
};
