import { action, configure, observable, runInAction } from 'mobx';

import { StoreState } from "../app/AppTypes";
import { uploadImage } from "../imgur/ImgurApi";

configure({ enforceActions: 'observed' });

class MosaicStore {
    @observable public sharedMosaicLink: string | null = null;
    @observable public state: StoreState = 'pending';

    @action('Share mosaic')
    public async shareMosaic(base64Image: string) {
        this.sharedMosaicLink = null;
        this.state = 'pending';

        try {
            const sharedMosaicLink = await uploadImage(base64Image);

            runInAction('Update shared mosaic link', () => {
                this.state = 'done';
                this.sharedMosaicLink = sharedMosaicLink;
            });
        }
        catch (_) {
            runInAction('Error during sharing mosaic', () => {
                this.state = 'error';
            })
        }
    }

    @action('Reset shared mosaic link')
    public resetSharedMosaicLink() {
        this.sharedMosaicLink = null;
    }
}

export default MosaicStore;
