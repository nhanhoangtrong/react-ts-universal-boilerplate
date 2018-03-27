/* tslint:disable:no-var-requires */
export const staticMiddleware =
    process.env.NODE_ENV === 'development'
        ? require('./staticMiddleware.dev').default
        : require('./staticMiddleware.prod').default;
