import { useMemo } from 'react';

import { useSetting } from '@micromag/core/contexts';
import { getMediaFilesAsArray, getVideoSupportedMimes } from '@micromag/core/utils';

// Disabled webm for now
// const defaultPossibleMimes = ['video/mp4', 'video/webm', 'video/ogg', 'application/vnd.apple.mpegurl'];

export default function useSources(media, { possibleMimes = null } = {}) {
    const { files: mediaFiles = null, metadata = null } = media || {};
    const { mime: mediaMime = null } = metadata || {};
    const settingsPossibleMimes = useSetting('supportedVideoMimes');
    const finalPossibleMimes = possibleMimes || settingsPossibleMimes;
    const files = useMemo(() => getMediaFilesAsArray(mediaFiles), [mediaFiles]);
    const sources = useMemo(() => {
        if (files.length === 0) {
            return null;
        }
        let supportedMimes = getVideoSupportedMimes(finalPossibleMimes);
        if (supportedMimes.length === 0) {
            supportedMimes = ['video/mp4'];
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
    }, [files, finalPossibleMimes]);

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
