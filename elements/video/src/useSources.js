import { useMemo } from 'react';

import { getMediaFilesAsArray, getVideoSupportedMimes } from '@micromag/core/utils';

export default function useSources(media) {
    const { files: mediaFiles = null, metadata = null } = media || {};
    const { mime: mediaMime = null } = metadata || {};
    const files = useMemo(() => getMediaFilesAsArray(mediaFiles), [mediaFiles]);
    const sources = useMemo(() => {
        if (files.length === 0) {
            return null;
        }
        let supportedMimes = getVideoSupportedMimes();
        if (supportedMimes.length === 0) {
            supportedMimes = ['video/mp4', 'video/webm'];
        }
        const supportedFiles = files.filter((file) => {
            const fileHandle = file.handle || file.id;
            const { mime = `video/${fileHandle === 'h264' ? 'mp4' : fileHandle}` } = file;
            return supportedMimes.indexOf(mime) !== -1;
        });
        const supportedFilesWithoutOriginal = supportedFiles.filter((file) => {
            const fileHandle = file.handle || file.id;
            return fileHandle !== 'original';
        });
        return (
            supportedFilesWithoutOriginal.length > 0
                ? supportedFilesWithoutOriginal
                : supportedFiles
        ).sort(({ size: a = Infinity }, { size: b = Infinity }) => {
            if (a === b) {
                return 0;
            }
            return a > b ? 1 : -1;
        });
    }, [files]);

    // @NOTE: Media is an animated image and doesn't have source files in video formats
    const { type: originalType = null, mime: originalMime = mediaMime } =
        files.find(({ handle }) => handle === 'original') || {};
    const originalFileIsImage =
        originalType === 'image' || (originalMime !== null && originalMime.indexOf('image/') === 0);

    return {
        sources: sources !== null && sources.length > 0 ? sources : null,
        files,
        isImage: originalFileIsImage,
    };
}
