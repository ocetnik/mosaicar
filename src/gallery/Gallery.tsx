import { inject, observer } from 'mobx-react';
import * as React from 'react';
import GalleryStore from "./GalleryStore";

import { IImage } from "../imgur/ImgurTypes";
import ImageThumbnail from "./ImageThumbnail";
import Pagination from "./Pagination";

interface IGalleryProps {
    galleryStore: GalleryStore;
    routing?: any;
}

interface IGalleryState {
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

        this.handlePrevPageClick = this.handlePrevPageClick.bind(this);
        this.handleNextPageClick = this.handleNextPageClick.bind(this);
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
        const { goBack } = this.props.routing;
        const onBackClick = () => goBack();
        const backButton = <button onClick={onBackClick}>Back</button>;

        const pagination = <Pagination
            onPrevPageClick={this.handlePrevPageClick}
            onNextPageClick={this.handleNextPageClick}
            pageNumber={this.state.pageNumber}
        />;

        const renderImages = this.props.galleryStore.images.map(
            (image: IImage) => <ImageThumbnail key={image.id} imageUri={image.link} />
        );

        return (
            <div>
                {backButton}
                {pagination}
                {renderImages}
            </div>
        );
    }

    private getNewImages() {
        this.props.galleryStore.getGalleryImages(this.state.pageNumber);
    }

    private handlePrevPageClick() {
        const pageNumber = this.state.pageNumber - 1;
        if (pageNumber < 1) {
            throw Error('Page number must be greater than 0');
        }
        this.setState({ pageNumber });
    }

    private handleNextPageClick() {
        const pageNumber = this.state.pageNumber + 1;
        this.setState({ pageNumber });
    }
}

export default Gallery;
