import * as React from 'react';
import { render } from 'react-dom';
import App from './components/App';
import { configureStore } from './redux';

import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const store = configureStore(history, window.__PRELOADEDSTATE__);

render(<App store={store} history={history} />, document.getElementById('app'));
