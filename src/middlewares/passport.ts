import * as passportLocal from 'passport-local';
import * as passportBearer from 'passport-http-bearer';
import * as jwt from 'jsonwebtoken';
import { User } from '../db';

const jwtSecret = process.env.JWT_SECRET || 'My JWT Secret';

export const localStrategy = new passportLocal.Strategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true,
}, (req, email, password, done) => {
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
            const emailErr = new Error('Email address has not been registered yet.');
            emailErr.name = 'EmailNotFound';
            return done(emailErr);
        }

        return user.comparePassword(loginData.password, (compareErr, matched) => {
            if (compareErr) {
                return done(compareErr);
            }

            if (!matched) {
                const passwordErr = new Error('Password was not matched.');
                passwordErr.name = 'PasswordMismatch';
                return done(passwordErr);
            }

            // If email and password matched, using JWT to sign the payload
            return jwt.sign({
                sub: user._id,
                name: user.fullName,
                role: user.role,
            }, jwtSecret, (signErr: Error, token: string) => {
                if (signErr) {
                    return done(signErr);
                }
                const userData = {
                    _id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    role: user.role,
                    token,
                };
                return done(null, userData);
            });
        });
    });
});

export const bearerStrategy = new passportBearer.Strategy((token, done) => {
    jwt.verify(token, jwtSecret, (err, user) => {
        if (err) {
            return done(err);
        }

        if (!user) {
            const userError = new Error('User not found.');
            userError.name = 'UserNotFound';
            return done(userError);
        }
        return done(null, user);
    });
});
