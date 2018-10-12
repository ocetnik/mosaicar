import { inject, observer } from 'mobx-react';
import * as React from 'react';
import GalleryStore from "./GalleryStore";

import BackButton from "../common/BackButton";
import { decreasePageNumber, increasePageNumber } from "./GalleryUtils";
import ImageThumbnails from "./ImageThumbnails";
import Pagination from "./Pagination";

interface IGalleryProps {
    galleryStore: GalleryStore;
    routing?: any;
}

export interface IGalleryState {
    pageNumber: number;
}

@inject('galleryStore', 'routing')
@observer
class Gallery extends React.Component<IGalleryProps, IGalleryState> {
    constructor(props: IGalleryProps) {
        super(props);
        this.state = {
            pageNumber: 1
        };

        this.handleOnPrevPageClick = this.handleOnPrevPageClick.bind(this);
        this.handleOnNextPageClick = this.handleOnNextPageClick.bind(this);
    }

    public componentDidMount() {
        this.getNewImages();
    }

    public componentDidUpdate(_: IGalleryProps, prevState: IGalleryState) {
        if (this.state.pageNumber !== prevState.pageNumber) {
            this.getNewImages()
        }
    }

    public render() {
        return (
            <div>
                <BackButton onBackButtonClick={this.props.routing.goBack}/>
                <Pagination
                    onPrevPageClick={this.handleOnPrevPageClick}
                    onNextPageClick={this.handleOnNextPageClick}
                    pageNumber={this.state.pageNumber}
                />
                <ImageThumbnails images={this.props.galleryStore.images} />
            </div>
        );
    }

    private getNewImages() {
        this.props.galleryStore.getGalleryImages(this.state.pageNumber);
    }

    private handleOnPrevPageClick() {
        this.setState(decreasePageNumber);
    }

    private handleOnNextPageClick() {
        this.setState(increasePageNumber);
    }
}

export default Gallery;
