import { MOSAIC } from "./RoutingConstants";

export function getPathToMosaicConversion(imageUri: string) {
    return {
        pathname: MOSAIC,
        state: {
            imageUri
        }
    };
}
