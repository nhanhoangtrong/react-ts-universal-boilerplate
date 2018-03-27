import * as express from 'express';
import * as validator from 'validator';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';
import { User } from '../db';
import { MongoError } from 'mongodb';
import { jwtSign, LocalAuthenticationError } from '../middlewares/passport';

const route = express.Router();

export class PayloadValidationError extends Error {
    public fields: any;
    constructor(...args: any[]) {
        super(...args);
        this.name = 'PayloadValidation';
        this.message = 'Payload validation errors.';
        this.fields = {};

        // Fixing instanceof operator
        // when extending built-ins that target ES5
        Object.setPrototypeOf(this, PayloadValidationError.prototype);
    }
}

const validateLoginMiddleware = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const payload = req.body;
    const fields: any = {};
    let valid = true;

    // First we check for the availability of payload
    let error = null;
    if (!payload) {
        valid = false;
        fields.payload = 'Payload was not provided.';
    } else {
        // Then, check for email
        if (
            typeof payload.email !== 'string' ||
            !validator.isEmail(payload.email.trim())
        ) {
            valid = false;
            fields.email = 'Please provide a correct email address.';
        }

        // And check for password
        if (
            typeof payload.password !== 'string' ||
            !validator.isLength(payload.password, 8)
        ) {
            valid = false;
            fields.password = 'Password must have at least 8 characters.';
        }
    }

    if (!valid) {
        error = new PayloadValidationError();
        error.fields = fields;
    }

    return next(error);
};

const validateSignupMiddleware = (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
) => {
    const payload = req.body;
    const fields: any = {};
    let valid = true;

    // First we check for the availability of payload
    let error = null;
    if (!payload) {
        valid = false;
        fields.payload = 'Payload was not provided.';
    } else {
        // First, check for name
        if (
            typeof payload.firstName !== 'string' ||
            validator.isEmpty(payload.firstName.trim())
        ) {
            valid = false;
            fields.firstName = 'First name must not be null.';
        }
        if (
            typeof payload.lastName !== 'string' ||
            validator.isEmpty(payload.lastName.trim())
        ) {
            valid = false;
            fields.lastName = 'Last name must not be null.';
        }

        // Then, check for email
        if (
            typeof payload.email !== 'string' ||
            !validator.isEmail(payload.email.trim())
        ) {
            valid = false;
            fields.email = 'Please provide a correct email address.';
        }

        // And check for password
        if (
            typeof payload.password !== 'string' ||
            !validator.isLength(payload.password, 8)
        ) {
            valid = false;
            fields.password = 'Password must have at least 8 characters.';
        }
    }

    if (!valid) {
        error = new PayloadValidationError();
        error.fields = fields;
    }

    return next(error);
};

route
    .post(
        '/login',
        validateLoginMiddleware,
        passport.authenticate('local', { session: false, failWithError: true }),
        jwtSign,
        (req, res, next) => {
            // Return the login information
            return res.status(200).json({
                message: 'Login successfully!',
                user: req.user,
            });
        }
    )
    .post('/signup', validateSignupMiddleware, (req, res, next) => {
        // After validated, create a new user
        return User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        })
            .then((newUser) => {
                // remove password field
                delete newUser.password;

                // Send a OK status
                return res.status(200).json(newUser);
            })
            .catch(next);
    })
    .use(
        (
            err: Error,
            req: express.Request,
            res: express.Response,
            next: express.NextFunction
        ) => {
            // Authentication route default error handler

            // First check for Mongo Error
            if (err instanceof MongoError) {
                if (err.code === 11000) {
                    // Send a Conflict status when email has been registered
                    return res.status(409).json({
                        message: 'Please check errors.',
                        errors: {
                            email: 'Email has been registered.',
                        },
                    });
                }

                // Send a Internal Server Error status for the rest
                res.status(500);
                // Then check for validation errors
            } else if (err instanceof PayloadValidationError) {
                // Send a Bad Request errors
                return res.status(400).json({
                    message: err.message,
                    errors: err.fields,
                });

                // Then check for authentication error
            } else if (err instanceof LocalAuthenticationError) {
                // Send a Unauthorized status
                return res.status(401).json({
                    message: err.message,
                    errors: err.fields,
                });
            }

            // Finally pass the error to next error handlers
            return next(err);
        }
    );

export default route;
