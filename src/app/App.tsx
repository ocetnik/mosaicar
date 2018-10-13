import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { Route } from 'react-router';

import Gallery from '../gallery/Gallery';
import Home from '../home/Home';
import Mosaic from '../mosaic/Mosaic';
import { GALLERY, MOSAIC } from '../routing/RoutingConstants';

class App extends React.Component<{}, {}> {
    private renderMobxReactDevTools = process.env.NODE_ENV !== 'production' ? <DevTools /> : null;

    public render() {
        return (
            <div className="App">
                <Route exact={true} path="/" component={Home} />
                <Route path={GALLERY} component={Gallery} />
                <Route path={MOSAIC} component={Mosaic} />
                {this.renderMobxReactDevTools}
            </div>
        );
    }
}

export default App;
