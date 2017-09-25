import { createServer } from 'http';
import { resolve } from 'path';
import * as dotenv from 'dotenv';
import * as chalk from 'chalk';
import * as winston from 'winston';
import 'isomorphic-fetch';

// Load .env file
dotenv.config({ path: resolve(__dirname, '../.env') });

/* tslint:disable:no-var-requires */
const app = require('./server').default;
/* tslint:enable:no-var-requires */

// First, create the server using
const server = createServer(app);
// Start the server
server.listen(app.get('port'), app.get('host'));

// Register listeners
server.on('listening', () => {
    winston.info('%s - Server is listening on %s:%d', chalk.green('Server'), app.get('host'), app.get('port'));
});

server.on('error', (err) => {
    winston.error('%s - Name: %s', chalk.red('Server'), err.name);
    winston.error('%s - Message: %s', chalk.red('Server'), err.message);
    winston.error('%s - Stack: %s', chalk.red('Server'), err.stack);
});
