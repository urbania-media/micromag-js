import isObject from 'lodash/isObject';
import { useMemo } from 'react';

import { getMediaFilesAsArray } from '../utils';

function useMediaThumbnail(media, file = null) {
    const thumbnail = useMemo(() => {
        if (isObject(file)) {
            return file;
        }

        const {
            thumbnail_url: defaultThumbnailUrl = null,
            files = null,
            metadata = null,
        } = media || {};
        const { width: mediaWidth, height: mediaHeight } = metadata || {};

        const filesArray = getMediaFilesAsArray(files) || [];
        const { url = null } =
            (file !== null ? filesArray.find(({ handle }) => handle === file) || null : null) || {};
        return url !== null || defaultThumbnailUrl !== null
            ? {
                  url: url || defaultThumbnailUrl,
                  metadata: { width: mediaWidth, height: mediaHeight },
              }
            : null;
    }, [media, file]);

    return thumbnail;
}

export default useMediaThumbnail;
