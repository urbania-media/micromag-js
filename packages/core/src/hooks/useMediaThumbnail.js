import isObject from 'lodash/isObject';
import { useMemo } from 'react';

import { getMediaFilesAsArray } from '../utils';

function useMediaThumbnail(media, file = null) {
    const { thumbnail_url: defaultThumbnailUrl = null, files = null } = media || {};
    const thumbnailUrl = useMemo(() => {
        const filesArray = getMediaFilesAsArray(files) || [];
        const { url } =
            (file !== null && !isObject(file)
                ? filesArray.find(({ handle }) => handle === file) || null
                : file) || {};
        return url || defaultThumbnailUrl;
    }, [files, file, defaultThumbnailUrl]);
    return thumbnailUrl;
}

export default useMediaThumbnail;
