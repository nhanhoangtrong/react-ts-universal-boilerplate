import * as passportLocal from 'passport-local';
import * as passportBearer from 'passport-http-bearer';
import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import { User } from '../db';

const jwtSecret = process.env.JWT_SECRET || 'My JWT Secret';

export class LocalAuthenticationError extends Error {
    public fields: any;
    constructor(...args: any[]) {
        super(...args);
        this.name = 'LocalAuthentication';
        this.fields = {};

        // Fixing instanceof operator
        // when extending built-ins that target ES5
        Object.setPrototypeOf(this, LocalAuthenticationError.prototype);
    }
}

export class BearerAuthenticationError extends Error {
    constructor(...args: any[]) {
        super(...args);
        this.name = 'BearerAuthenticationError';

        // Fixing instanceof operator
        // when extending built-ins that target ES5
        Object.setPrototypeOf(this, BearerAuthenticationError.prototype);
    }
}

export const localStrategy = new passportLocal.Strategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    (req, email, password, done) => {
        const loginData = {
            email: email.trim(),
            password: password.trim(),
        };

        // Find a user by email address
        User.findOne({ email }, (err: Error, user) => {
            if (err) {
                return done(err);
            }

            if (!user) {
                const emailErr = new LocalAuthenticationError(
                    'Email address has not been registered yet.'
                );
                emailErr.fields = {
                    email: 'Email was not found.',
                };
                return done(emailErr);
            }

            return user.comparePassword(
                loginData.password,
                (compareErr, matched) => {
                    if (compareErr) {
                        return done(compareErr);
                    }

                    if (!matched) {
                        const passwordErr = new LocalAuthenticationError(
                            'Password was not matched.'
                        );
                        passwordErr.fields = {
                            password: 'Password mismatched.',
                        };
                        return done(passwordErr);
                    }

                    // If email and password matched, return the user
                    return jwt.sign(
                        {
                            sub: user._id,
                            name: user.fullName,
                            role: user.role,
                        },
                        jwtSecret,
                        (signErr: Error, token: string) => {
                            if (signErr) {
                                return done(signErr);
                            }
                            const userData = {
                                _id: user._id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                role: user.role,
                                isAdmin: user.isAdmin,
                                token,
                            };
                            return done(null, userData);
                        }
                    );
                }
            );
        });
    }
);

export const jwtSign = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const user = req.user;
    if (!user) {
        // If user not found, throw error
        return next(
            new LocalAuthenticationError('User has not been authenticated yet.')
        );
    }
    return jwt.sign(
        {
            sub: user._id,
            name: `${user.firstName} ${user.lastName}`,
            scope: `${user.role}`,
            admin: user.isAdmin,
        },
        jwtSecret,
        (signErr: Error, token: string) => {
            // Check for JWT sign errors
            if (signErr) {
                return next(signErr);
            }

            // Re-assign req user value for next
            req.user = {
                token,
            };

            return next();
        }
    );
};

export const bearerStrategy = new passportBearer.Strategy((token, done) => {
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            const tokenError = new BearerAuthenticationError(
                'Authentication token is not available.'
            );
            return done(tokenError);
        }
        return done(null, user);
    });
});
