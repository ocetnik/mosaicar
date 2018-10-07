import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';

import App from './App';
import GalleryStore from "./gallery/GalleryStore";
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routingStore);

const stores = {
    gallery: new GalleryStore(),
    routing: routingStore,
};

ReactDOM.render(
    <Provider {...stores}>
        <Router history={history}>
            <App />
        </Router>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
