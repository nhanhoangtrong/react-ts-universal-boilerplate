/* tslint:disable:no-var-requires */
export const staticMiddleware = process.env.NODE_ENV === 'production' ? require('./staticMiddleware.prod').default : require('./staticMiddleware.dev').default;
