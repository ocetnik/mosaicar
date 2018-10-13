import * as fetchMock from 'fetch-mock';

import { fetchGallery, uploadImage } from '../ImgurApi';

describe('fetchGallery', () => {
    const galleryUri = 'https://api.imgur.com/3/gallery/r/EarthPorn/1?q_type=jpg';
    const images = [
        { id: '0', link: 'https://path/to/img0.jpg' },
        { id: '1', link: 'https://path/to/img1.jpg' },
    ];

    afterEach(() => {
        fetchMock.restore();
    });

    it('should get gallery data', (done) => {
        fetchMock.mock(
            galleryUri,
            {
                body: {
                    data: images,
                    status: 200,
                    success: true
                }
            });

        fetchGallery(1).then((data) => {
            expect(data).toEqual([
                { id: '0', link: 'https://path/to/img0.jpg' },
                { id: '1', link: 'https://path/to/img1.jpg' },
            ]);
            done();
        });
    });

    it('should throw Error in response when fetch gallery returns status !== 200', () => {
        fetchMock.mock(
            galleryUri,
            {
                body: {
                    data: images,
                    status: 400,
                    success: true
                }
            });

        expect(fetchGallery(1)).rejects.toEqual(new Error('Error in response'))
    });

    it('should throw Error in response when fetch gallery returns success === false', () => {
        fetchMock.mock(
            galleryUri,
            {
                body: {
                    data: images,
                    status: 200,
                    success: false
                }
            });

        expect(fetchGallery(1)).rejects.toEqual(new Error('Error in response'))
    });
});

describe('uploadImage', () => {
    const imageUri = 'https://api.imgur.com/3/image';
    const base64Image = 'base64ImageData';
    const image = {
        id: '0',
        link: 'https://path/to/img0.jpg'
    };

    afterEach(() => {
        fetchMock.restore();
    });

    it('should get uploaded image URI', (done) => {
        fetchMock.mock(
            imageUri,
            {
                body: {
                    data: image,
                    status: 200,
                    success: true
                }
            });

        uploadImage(base64Image).then((data) => {
            expect(data).toEqual('https://path/to/img0.jpg');
            done();
        });
    });


    it('should throw Error in response when upload image returns status !== 200', () => {
        fetchMock.mock(
            imageUri,
            {
                body: {
                    data: image,
                    status: 400,
                    success: true
                }
            });

        expect(uploadImage(base64Image)).rejects.toEqual(new Error('Error in response'))
    });

    it('should throw Error in response when upload image returns success === false', () => {
        fetchMock.mock(
            imageUri,
            {
                body: {
                    data: image,
                    status: 200,
                    success: false
                }
            });

        expect(uploadImage(base64Image)).rejects.toEqual(new Error('Error in response'))
    });
});
