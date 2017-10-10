import { Router } from 'express';
import * as validator from 'validator';
import * as passport from 'passport';
import { User } from '../db';
import { MongoError } from 'mongodb';

const route = Router();

const validateLogin = (payload: any) => {
    const errors: any = {};
    let valid = true;
    let message = '';

    // First we check for the availability of payload
    if (!payload) {
        valid = false;
        errors.payload = 'Payload not provided.';
    } else {
        // Then, check for email
        if (typeof payload.email !== 'string' || !validator.isEmail(payload.email.trim())) {
            valid = false;
            errors.email = 'Please provide a correct email address.';
        }

        // And check for password
        if (typeof payload.password !== 'string' || !validator.isLength(payload.password, 8)) {
            valid = false;
            errors.password = 'Password must have at least 8 characters.';
        }
    }

    if (!valid) {
        message = 'Please check errors.';
    }

    return {
        valid,
        errors,
        message,
    };
};

const validateSignup = (payload: any) => {
    const errors: any = {};
    let valid = true;
    let message = '';

    // First we check for the availability of payload
    if (!payload) {
        valid = false;
        errors.payload = 'Payload not provided.';
    } else {
        // First, check for name
        if (typeof payload.firstName !== 'string' || validator.isEmpty(payload.firstName.trim())) {
            valid = false;
            errors.firstName = 'First name must not be null.';
        }
        if (typeof payload.lastName !== 'string' || validator.isEmpty(payload.lastName.trim())) {
            valid = false;
            errors.lastName = 'Last name must not be null.';
        }

        // Then, check for email
        if (typeof payload.email !== 'string' || !validator.isEmail(payload.email.trim())) {
            valid = false;
            errors.email = 'Please provide a correct email address.';
        }

        // And check for password
        if (typeof payload.password !== 'string' || !validator.isLength(payload.password, 8)) {
            valid = false;
            errors.password = 'Password must have at least 8 characters.';
        }
    }

    if (!valid) {
        message = 'Please check errors.';
    }

    return {
        valid,
        errors,
        message,
    };
};

route.post('/login', (req, res, next) => {
    const result = validateLogin(req.body);
    if (!result.valid) {
        return res.status(400).json(result);
    }

    return passport.authenticate('local', {
        session: false,
    }, (err: Error, user: any) => {
        if (err) {
            if (err.name === 'EmailNotFound') {
                return res.status(400).json({
                    message: 'Please check errors.',
                    errors: {
                        email: err.message,
                    },
                });
            } else if (err.name === 'PasswordMismatch') {
                return res.status(400).json({
                    message: 'Please check errors.',
                    errors: {
                        password: err.message,
                    },
                });
            }

            return res.status(400).json({
                message: 'Could not process the form',
            });
        }

        return res.status(200).json({
            message: 'Login successfully!',
            user,
        });
    })(req, res, next);

}).post('/signup', (req, res, next) => {
    const result = validateSignup(req.body);

    if (!result.valid) {
        return res.status(400);
    }

    return User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
    }).then((newUser) => {
        return res.status(200).json(newUser);
    }).catch((err) => {
        if (err) {
            if (err instanceof MongoError && err.code === 11000) {
                return res.status(409).json({
                    message: 'Please check errors',
                    errors: {
                        email: 'Email has been registered',
                    },
                });
            }

            return res.status(400).json({
                message: 'Could not process signup',
            });
        }

        return next(err);
    });
});

export default route;
