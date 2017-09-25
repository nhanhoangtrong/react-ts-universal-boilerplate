/* tslint:disable:no-var-requires */
import 'babel-polyfill';
import 'isomorphic-fetch';
__DEV__ ? require('./client.dev') : require('./client.prod');
