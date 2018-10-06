import { action, configure, observable, runInAction } from 'mobx';
import { fetchImagesPage } from "../api";
import { IImage } from "../types";

configure({ enforceActions: 'observed' });

type StoreState = 'pending' | 'done' | 'error';

class GalleryStore {
    @observable public imgurGalleryImages: IImage[] = [];
    @observable public state: StoreState = 'pending';

    @action('Fetch Imgur images')
    public async fetchImgurImages(pageNumber: number) {
        this.imgurGalleryImages = [];
        this.state = 'pending';

        try {
            const imagesPage = await fetchImagesPage(pageNumber);
            const images = imagesPage.map(
                (image: IImage) => {
                    return {
                        id: image.id,
                        link: image.link
                    }
                }
            );

            runInAction('Update gallery images', () => {
                this.state = 'done';
                this.imgurGalleryImages = images;
            });
        }
        catch (_) {
            runInAction('Error during fetching Imgur images', () => {
                this.state = 'error';
            })
        }
    }
}

export default GalleryStore;
