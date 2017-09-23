import * as React from 'react';
import { Application } from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import Home from './routes/Home';
import { configureStore } from './redux';

const store = configureStore({
    globals: {
        isLoading: false,
    },
});

export default (app: Application, publicPath: string) => {
    app.get('*', (req, res, next) => {
        const context = {};
        const appHTML = renderToString(
            <Provider store={store}>
                <StaticRouter
                    location={req.url}
                    context={context}>
                    <Home />
                </StaticRouter>
            </Provider>,
        );
        res.render('index', {
            title: 'Server-side rendering',
            publicPath,
            appHTML,
            cssFiles: [
                'style',
            ],
        });
    });
};
