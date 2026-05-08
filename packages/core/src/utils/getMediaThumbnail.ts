import isObject from 'lodash/isObject';

import { ImageMedia, MediaFile } from '../types';
import getMediaFilesAsArray from './getMediaFilesAsArray';

function getMediaThumbnail(
    media,
    thumbnail: MediaFile | ImageMedia | string = null,
): { metadata?: { width?: number; height?: number }; url: string } | null {
    if (isObject(thumbnail)) {
        return thumbnail;
    }
    const {
        thumbnail_url: defaultThumbnailUrl = null,
        files = null,
        metadata = null,
    } = media || {};
    const { width: mediaWidth, height: mediaHeight } = metadata || {};

    const filesArray = getMediaFilesAsArray(files) || [];
    const { url = null } =
        (thumbnail !== null
            ? filesArray.find(({ handle }) => handle === thumbnail) || null
            : null) || {};
    return url !== null || defaultThumbnailUrl !== null
        ? {
              url: url || defaultThumbnailUrl,
              metadata: { width: mediaWidth, height: mediaHeight },
          }
        : null;
}

export default getMediaThumbnail;
