import { Application } from 'express';
import * as webpack from 'webpack';

import * as webpackHotMiddleware from 'webpack-hot-middleware';
import * as webpackDevMiddleware from 'webpack-dev-middleware';

import * as clientWebpackConfig from '../../webpack/client.config';

export default (app: Application, publicPath?: string) => {
    const webpackConfig = clientWebpackConfig({
        production: JSON.stringify(false),
    });
    const webpackBundler = webpack(webpackConfig);
    app.use(webpackHotMiddleware(webpackBundler, {
        // Hot middleware config
    }));
    app.use(webpackDevMiddleware(webpackBundler, {
        // Dev middleware config
        publicPath,
        noInfo: true,
        stats: {
            colors: true,
        },
    }));
};
