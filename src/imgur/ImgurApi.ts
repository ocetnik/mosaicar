import { IGalleryResponse, IImage, IImageResponse } from './ImgurTypes';

const IMGUR_CLIENT_ID = '8c1b6dffe0e52fc';
const IMGUR_ENDPOINT = 'https://api.imgur.com/3';
const SUBREDDIT_GALLERY_NAME = 'EarthPorn';

const headers = {
    'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
    'Content-Type': 'application/json'
};

// fetch one specific gallery page of hot subreddit jpg images from the last day
// sorted by their virality
export async function fetchGallery(pageNumber: number): Promise<IImage[]> {
    const uri = `${IMGUR_ENDPOINT}/gallery/r/${SUBREDDIT_GALLERY_NAME}/${pageNumber}?q_type=jpg`;

    const response = await fetch(
        uri,
        {
            headers,
            method: 'GET'
        }
    );

    const responseJson = await getResponseJson<IGalleryResponse>(response);

    return responseJson.data;
}

// upload image to imgur and return string with link to uploaded image
export async function uploadImage(base64Image: string): Promise<string> {
    const uri = `${IMGUR_ENDPOINT}/image`;

    const response = await fetch(
        uri,
        {
            body: JSON.stringify({
                image: base64Image
            }),
            headers,
            method: 'POST'
        }
    );

    const responseJson = await getResponseJson<IImageResponse>(response);

    return responseJson.data.link;
}

async function getResponseJson<T>(response: Response): Promise<T> {
    if (!response.ok) {
        throw Error(response.statusText);
    }

    const responseJson = await response.json();

    if (!responseJson.success || responseJson.status !== 200) {
        throw Error('Error in response');
    }

    return responseJson;
}
