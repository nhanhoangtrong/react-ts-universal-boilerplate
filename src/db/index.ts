import * as redis from 'redis';
import * as mongoose from 'mongoose';
import * as winston from 'winston';
import * as chalk from 'chalk';

import UserModel from './mongo/User';
import UserRoleModel from './mongo/UserRole';
import TodoItemModel from './mongo/TodoItem';

export let redisClient: redis.RedisClient;

export const connectRedis = (
    cb: (err?: Error, client?: redis.RedisClient) => void
) => {
    redisClient = redis.createClient();
    redisClient.on('error', (err) => {
        cb(err);
    });
    redisClient.on('ready', () => {
        cb(null, redisClient);
    });
};

export const connectMongoDB = (
    connectString: string,
    cb: (err?: Error) => void
) => {
    mongoose.connect(connectString, (err: Error) => {
        if (err) {
            return cb(err);
        }
        return cb();
    });
};

// Exporting models
/* tslint:disable:no-var-requires */
export const User = UserModel;
export const UserRole = UserRoleModel;
export const TodoItem = TodoItemModel;
