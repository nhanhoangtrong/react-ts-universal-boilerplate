import * as express from 'express';
import { graphqlExpress } from 'apollo-server-express';
import { schema } from '../db/graphql/Schema';

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

route.use(graphqlExpress({
    schema: schema,
    debug: process.env.NODE_ENV !== 'production',
}));

export default route;
