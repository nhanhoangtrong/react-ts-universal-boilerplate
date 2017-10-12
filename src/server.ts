import * as express from 'express';
import { resolve, join } from 'path';
import * as chalk from 'chalk';
import * as winston from 'winston';
import { mkdirSync, existsSync } from 'fs';

import * as mongoose from 'mongoose';
import { connectRedis, connectMongoDB } from './db';

import * as morgan from 'morgan';
import * as statusMonitor from 'express-status-monitor';
import * as hbs from 'express-hbs';
import * as bodyParser from 'body-parser';
import * as passport from 'passport';

import { staticMiddleware } from './middlewares';

import { localStrategy, bearerStrategy } from './middlewares/passport';

import apiRoute from './controllers/api';
import authRoute from './controllers/auth';

const isProduction = process.env.NODE_ENV === 'production';

// Create a new Express application
const app = express();

/**
 * Set the Express application variables
 */
// Check for the views folder
const hbsViews: {
    [key: string]: string;
} = {
    baseDir: resolve(__dirname, './views'),
    partialsDir: resolve(__dirname, './views', 'partials'),
    layoutsDir: resolve(__dirname, './views', 'layouts'),
};
try {
    Object.keys(hbsViews).forEach((key: string, i: number) => {
        const dir: string = hbsViews[key];
        if (!existsSync(dir)) {
            mkdirSync(dir);
        }
    });
} catch (err) {
    winston.error('%s - Errors on creating views folders', chalk.red('Views'));
    if (err instanceof Error) {
        winston.error('%s - Name: %s', chalk.red('Views'), err.name);
        winston.error('%s - Message: %s', chalk.red('Views'), err.message);
        winston.error('%s - Stack: %s', chalk.red('Views'), err.stack);
    }
    process.exit(1);
}
app.engine('hbs', hbs.express4({
    partialsDir: hbsViews.partialsDir,
    layoutsDir: hbsViews.layoutsDir,
}));
app.set('host', process.env.HOST || 'localhost');
app.set('port', parseInt(process.env.PORT, 10) || 3000);
app.set('views', hbsViews.baseDir);
app.set('view engine', 'hbs');

/**
 * Then configurating and connecting to the MongoDB with Mongoose
 */
connectMongoDB(process.env.MONGODB_CONNECT_URI, (err: Error) => {
    if (err) {
        winston.error(err.message);
        winston.info('%s - MongoDB connection error. Please make sure MongoDB is running.', chalk.red('Error'));
        process.exit(1);
    }
    winston.info('%s - MongoDB client is ready.', chalk.green('MongoDB'));
});
connectRedis((err, redisClient) => {
    if (err) {
        console.error(err);
        winston.info('%s - Please make sure Redis is running.', chalk.red('Redis connection error'));
        process.exit(1);
    }
    winston.info('%s - Redis client is ready.', chalk.green('Redis'));
});

app.use(morgan(isProduction ? 'combined' : 'dev'));
app.use(statusMonitor());

// Body Parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Initialize passport
app.use(passport.initialize());
passport.use('local', localStrategy);
passport.use('bearer', bearerStrategy);

// Register specific middlewares
const publicPath = process.env.PUBLIC_PATH || '/assets';
staticMiddleware(app, publicPath, join(__dirname, publicPath));

// Register routes
app.use('/auth', authRoute);
app.use('/api', apiRoute);

/* tslint:disable:no-var-requires */
if (isProduction) {
    const serverRendering = require('./serverRendering').default;
    serverRendering(app, publicPath);
} else {
    app.get('*', (req, res, next) => {
        res.render('index', {
            title: 'Development Stage',
            publicPath,
        });
    });
}

// Error logging handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (isProduction) {
        delete err.stack;
    }
    winston.error(err.message);
    winston.error(err.stack);

    next(err);
});
// Default error handler status check
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {

    // Check if error statusCode has been set or not
    if (res.statusCode === 200) {
        // If not, set default status is Internal Server Error
        res.statusCode = 500;
    }

    return next(err);
});
// Default error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    // Check if headers is sent
    if (res.headersSent) {
        return next(err);
    }

    // Check if AJAX request, send the json error
    if (req.xhr) {
        return res.json(err);
    }
    return res.send(JSON.stringify(err));
});

export default app;
