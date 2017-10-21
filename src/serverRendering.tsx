import * as React from 'react';
import { Application } from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import Home from './routes/Home';
import { configureStore, RootState } from './redux';
import { createMemoryHistory } from 'history';

const preloadedState: RootState = {
    globals: {
        isLoading: false,
    },
    todos: [{
        id: 'abc',
        text: 'Default Todo From Server',
        completed: false,
    }],
};

export default (app: Application, publicPath: string) => {
    app.get('*', (req, res, next) => {
        const memoryHistory = createMemoryHistory({
            initialEntries: [req.path],
        });
        const context = {};
        const store = configureStore(memoryHistory, preloadedState);
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
            // Replace '<' by equivalent Unicode for prevent script attacks
            preloadedState: preloadedState ? JSON.stringify(preloadedState).replace(/</g, '\\u003c') : null,
        });
    });
};
