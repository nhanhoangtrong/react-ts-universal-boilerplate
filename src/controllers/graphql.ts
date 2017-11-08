import * as express from 'express';
import { graphqlExpress } from 'apollo-server-express';
import * as passport from 'passport';
import { checkPermissions } from '../middlewares/permissions';
import { schema } from '../db/graphql';

const route = express.Router();

// Add support for application/graphql
route.use((req, res, next) => {
    if (req.is('application/graphql')) {
        req.body = {
            query: req.body,
        };
    }
    next();
});
route.use(passport.authenticate('bearer', { session: false, failWithError: true }));
route.use(graphqlExpress((req, res) => ({
    schema,
    context: {
        user: req.user,
    },
    tracing: process.env.NODE_ENV === 'development',
    debug: process.env.NODE_ENV === 'development',
})));

export default route;
