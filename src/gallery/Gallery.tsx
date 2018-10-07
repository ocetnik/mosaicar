import { inject, observer } from 'mobx-react';
import * as React from 'react';
import GalleryStore from "./GalleryStore";

import { IImage } from "./GalleryTypes";
import ImageThumbnail from "./ImageThumbnail";
import Pagination from "./Pagination";

interface IGalleryProps {
    gallery: GalleryStore
}

interface IGalleryState {
    pageNumber: number
}

@inject('gallery')
@observer
class Gallery extends React.Component<IGalleryProps, IGalleryState> {
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
        const renderImages = this.props.gallery.imgurGalleryImages.map(
            (image: IImage) => <ImageThumbnail key={image.id} link={image.link} />
        );

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
        this.props.gallery.fetchImgurImages(this.state.pageNumber);
    }

    private handlePrevPageClick() {
        this.setState({ pageNumber: this.state.pageNumber - 1 });
    }

    private handleNextPageClick() {
        this.setState({ pageNumber: this.state.pageNumber + 1 });
    }
}

export default Gallery;
