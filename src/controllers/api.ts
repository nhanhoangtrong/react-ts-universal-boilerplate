import * as express from 'express';
import * as passport from 'passport';
import { TokenExpiredError, NotBeforeError, JsonWebTokenError } from 'jsonwebtoken';
import { permission, NotHavePermissionError } from '../middlewares/permission';
import { BearerAuthenticationError } from '../middlewares/passport';

const route = express.Router();

route.use(passport.authenticate('bearer', { session: false, failWithError: true }));

route.get('/author', permission('author'), (req, res, next) => {
    // Send a secret message include decoded user
    return res.json({
        message: 'This is a secret!',
        name: req.user.name,
    });
}).get('/guest', permission('guest'), (req, res, next) => {
    return res.json({
        message: 'This is for guest',
        name: req.user.name,
    });
}).use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Handle errors thrown by authentication and permision middlewares
    if (err instanceof BearerAuthenticationError) {
        // Send a Unauthorized status
        res.status(401);
    } else if (err instanceof NotHavePermissionError) {
        // Send a Forbidden status
        res.status(403);
    } else if (err instanceof TokenExpiredError) {
        // Send a Gone status
        res.status(410);
    } else if (err instanceof NotBeforeError) {
        // Send a Gone status
        res.status(410);
    } else if (err instanceof JsonWebTokenError) {
        // Send a Bad Request status
        res.status(400);
    }

    return next(err);
});

export default route;
