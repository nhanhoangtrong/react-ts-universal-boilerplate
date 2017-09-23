import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App, { AppRootComponent } from './components/App';
import { configureStore } from './redux';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
const store = configureStore(history);

const renderDOM = (AppComponent: AppRootComponent) => {
    render(
        <AppContainer>
            <AppComponent store={store} history={history}/>
        </AppContainer>, document.getElementById('app'));
};

renderDOM(App);

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        renderDOM(NextApp);
    });
}
