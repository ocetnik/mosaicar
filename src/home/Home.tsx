import { inject } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import * as React from "react";

import { ChangeEvent } from "react";
import { GALLERY } from "../routing/RoutingConstants";
import { getPathToMosaicConversion } from "../routing/RoutingUtils";

interface IHomeProps {
    routing?: RouterStore;
}

@inject('routing')
class Home extends React.Component<IHomeProps, {}> {
    constructor(props: IHomeProps) {
        super(props);
        this.handleOnFileChange = this.handleOnFileChange.bind(this);
        this.handleOnGalleryButtonClick = this.handleOnGalleryButtonClick.bind(this);
    }

    public render() {
        return (
            <div>
                <input type="file" onChange={this.handleOnFileChange} accept="image/*" />
                <button onClick={this.handleOnGalleryButtonClick}>
                    Select image from Imgur gallery
                </button>
            </div>
        );
    }

    private handleOnFileChange(event: ChangeEvent<HTMLInputElement>): void {
        const files = event.target.files;
        if (!files) {
            return
        }

        const file = files[0];
        if (!file) {
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = ({ target: { result } }: any) => {
            this.props.routing!.push(getPathToMosaicConversion(result));
        };

        fileReader.readAsDataURL(file);
    }

    private handleOnGalleryButtonClick(): void {
        this.props.routing!.push(GALLERY);
    };
}

export default Home;
