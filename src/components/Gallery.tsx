import { inject, observer } from 'mobx-react';
import * as React from 'react';
import GalleryStore from "../store";
import { IImage } from "../types";
import Pagination from "./Pagination";

interface IGalleryProps {
    galleryStore: GalleryStore
}

interface IGalleryState {
    pageNumber: number
}

@inject('galleryStore')
@observer
class Gallery extends React.Component<IGalleryProps, IGalleryState> {
    private static renderImage() {
        return (image: IImage) => (
            <img
                key={image.id}
                srcSet={image.link}
                width="50"
                height="50"
            />
        );
    }

    constructor(props: IGalleryProps) {
        super(props);
        this.state = {
            pageNumber: 1
        };

        this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);
    }

    public componentDidMount() {
        this.fetchNewImages();
    }

    public componentDidUpdate(_: IGalleryProps, prevState: IGalleryState) {
        if (this.state.pageNumber !== prevState.pageNumber) {
            this.fetchNewImages()
        }
    }

    public render() {
        const images = this.props.galleryStore.imgurGalleryImages;
        const renderImages = images.map(Gallery.renderImage());

        return (
            <div>
                <Pagination
                    onPrevPageClick={this.handlePrevPageClick}
                    onNextPageClick={this.handleNextPageClick}
                    pageNumber={this.state.pageNumber}
                />
                {renderImages}
            </div>
        );
    }

    private fetchNewImages() {
        this.props.galleryStore.fetchImgurImages(this.state.pageNumber);
    }

    private handlePrevPageClick() {
        this.setState({ pageNumber: this.state.pageNumber - 1 });
    }

    private handleNextPageClick() {
        this.setState({ pageNumber: this.state.pageNumber + 1 });
    }
}

export default Gallery;
