import isObject from 'lodash/isObject';
import { useMemo } from 'react';

import { getMediaFilesAsArray } from '../utils';

function useMediaThumbnail(media, file = null) {
    const { thumbnail_url: defaultThumbnailUrl = null, files = null, metadata = null } = media || {};
    const { width: mediaWidth, height: mediaHeight } = metadata || {};
    const thumbnail = useMemo(() => {
        if (isObject(file)) {
            return file;
        }
        const filesArray = getMediaFilesAsArray(files) || [];
        const mediaFile =
            (file !== null
                ? filesArray.find(({ handle }) => handle === file) || null
                : null) || {};
        return url || defaultThumbnailUrl;
    }, [files, file, defaultThumbnailUrl]);


    {
        url: thumbnailUrl,
        metadata: { width: videoWidth, height: videoHeight },
    }


    return thumbnailUrl;
}

export default useMediaThumbnail;
