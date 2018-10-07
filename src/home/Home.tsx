import { inject } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import * as React from "react";

import { GALLERY } from "../routing/RoutingConstants";
import { getPathToMosaicConversion } from "../routing/RoutingUtils";

interface IHomeProps {
    routing?: RouterStore;
}

@inject('routing')
class Home extends React.Component<IHomeProps, {}> {
    constructor(props: IHomeProps) {
        super(props);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    public render() {
        const onGalleryClick = () => {
            this.props.routing!.push(GALLERY);
        };

        return (
            <div>
                <input type="file" onChange={this.handleFileChange} accept="image/*" />
                <button onClick={onGalleryClick}>
                    Select image from Imgur gallery
                </button>
            </div>
        );
    }

    // TODO add types
    private handleFileChange({ target: { files: [file] } }: any) {
        if (!file) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = ({ target: { result } }: any) => {
            this.props.routing!.push(getPathToMosaicConversion(result));
        };

        fileReader.readAsDataURL(file);
    }
}

export default Home;
