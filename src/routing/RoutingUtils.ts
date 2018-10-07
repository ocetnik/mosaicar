import { MOSAIC } from "./RoutingConstants";

export function getPathToMosaicConversion(link: string) {
    return {
        pathname: MOSAIC,
        state: {
            imageUri: link
        }
    };
}
