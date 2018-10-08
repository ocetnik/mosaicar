import { action, configure, observable, runInAction } from 'mobx';

import { StoreState } from "../app/AppTypes";
import { fetchGallery } from "../imgur/ImgurApi";
import { IImage } from "../imgur/ImgurTypes";

configure({ enforceActions: 'observed' });

class GalleryStore {
    @observable public images: IImage[] = [];
    @observable public state: StoreState = 'pending';

    @action('Get gallery images')
    public async getGalleryImages(pageNumber: number) {
        this.images = [];
        this.state = 'pending';

        try {
            const gallery = await fetchGallery(pageNumber);
            const images = gallery.map(
                (image: IImage) => {
                    return {
                        id: image.id,
                        link: image.link
                    }
                }
            );

            runInAction('Update gallery images', () => {
                this.state = 'done';
                this.images = images;
            });
        }
        catch (_) {
            runInAction('Error during getting images', () => {
                this.state = 'error';
            })
        }
    }
}

export default GalleryStore;
