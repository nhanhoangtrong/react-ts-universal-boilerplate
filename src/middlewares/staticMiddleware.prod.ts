import * as express from 'express';

export default (app: express.Application, publicPath?: string, publicDir?: string) => {
    app.use(publicPath, express.static(publicDir));
};
