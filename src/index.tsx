import createBrowserHistory from 'history/createBrowserHistory';
import { Provider } from 'mobx-react';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router } from 'react-router';

import App from './app/App';
import GalleryStore from "./gallery/GalleryStore";
import MosaicStore from "./mosaic/MosaicStore";
import registerServiceWorker from './registerServiceWorker';

import './index.css';

const browserHistory = createBrowserHistory();
const routerStore = new RouterStore();
const history = syncHistoryWithStore(browserHistory, routerStore);

const stores = {
    galleryStore: new GalleryStore(),
    mosaicStore: new MosaicStore(),
    routing: routerStore,
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
