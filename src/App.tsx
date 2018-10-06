import DevTools from 'mobx-react-devtools';
import * as React from 'react';
import Gallery from "./components/Gallery";
import GalleryStore from "./store";

class App extends React.Component<{}, {}> {
    private renderMobxReactDevTools = process.env.NODE_ENV !== 'production' ? <DevTools /> : null;

    public render() {
        return (
            <div className="App">
                <Gallery galleryStore={new GalleryStore} />
                {this.renderMobxReactDevTools}
            </div>
        );
    }
}

export default App;
