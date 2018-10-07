import { IGallery, IImage } from "./GalleryTypes";

const IMGUR_CLIENT_ID = '8c1b6dffe0e52fc';
const IMGUR_ENDPOINT = 'https://api.imgur.com/3';
const SUBREDDIT_GALLERY_NAME = 'EarthPorn';

// fetch one specific page of hot subreddit jpg images from the last day, sorted by their virality
export async function fetchImagesPage(pageNumber: number): Promise<IImage[]> {
    const uri = `${IMGUR_ENDPOINT}/gallery/r/${SUBREDDIT_GALLERY_NAME}/${pageNumber}?q_type=jpg`;
    const response = await fetch(
        uri,
        {
            headers: {
                'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
                'Content-Type': 'application/json'
            },
            method: 'GET'
        }
    );

    if (!response.ok) {
        throw Error(response.statusText);
    }

    const responseJson: IGallery = await response.json();

    if (!responseJson.success || responseJson.status !== 200) {
        throw Error('Failed to fetch images from Imgur');
    }

    return responseJson.data;
}
