import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import { Route } from 'react-router';

import { MOSAIC } from "./constants/routes";
import Gallery from "./gallery/Gallery";
import Mosaic from "./mosaic/Mosaic";

class App extends React.Component<{}, {}> {
    private renderMobxReactDevTools = process.env.NODE_ENV !== 'production' ? <DevTools /> : null;

    public render() {
        return (
            <div className="App">
                <Route exact={true} path="/" component={Gallery} />
                <Route path={MOSAIC} component={Mosaic} />
                {this.renderMobxReactDevTools}
            </div>
        );
    }
}

export default App;
