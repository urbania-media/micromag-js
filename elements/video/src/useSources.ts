import { useEffect, useMemo, useState } from 'react';

import { useSetting, useVideoRendition } from '@micromag/core/contexts';
import { getMediaFilesAsArray, getVideoSupportedMimes } from '@micromag/core/utils';

import getVideoSources, { DEFAULT_VIDEO_MIMES } from './getVideoSources';

export default function useSources(media = null, options = null) {
    const { possibleMimes = null } = options || {};
    const { files: mediaFiles = null, metadata = null } = media || {};
    const { mime: mediaMime = null } = metadata || {};
    // Hosts opt in to other formats (ex.: webm) with the setting `supportedVideoMimes`
    const settingsPossibleMimes = useSetting('supportedVideoMimes');
    const finalPossibleMimes = useMemo(
        () => possibleMimes || settingsPossibleMimes || DEFAULT_VIDEO_MIMES,
        [possibleMimes, settingsPossibleMimes],
    );
    const files = useMemo(() => getMediaFilesAsArray(mediaFiles), [mediaFiles]);
    const [supportedMimes, setSupportedMimes] = useState(finalPossibleMimes);
    useEffect(() => {
        const newMimes = getVideoSupportedMimes(finalPossibleMimes);
        setSupportedMimes(newMimes.length > 0 ? newMimes : DEFAULT_VIDEO_MIMES);
    }, [finalPossibleMimes]);

    // One H.264 rendering for the whole viewer (see `getVideoRendition`). Null while the viewer
    // has not chosen it: no source yet, so the browser downloads nothing it would throw away
    const rendition = useVideoRendition();
    const renditionSources = getVideoSources(files, supportedMimes, rendition || 'h264');
    const sources = rendition !== null ? renditionSources : [];

    // @NOTE: Media is an animated image and doesn't have source files in video formats
    const { type: originalType = null, mime: originalMime = mediaMime } =
        files.find(({ handle }) => handle === 'original') || {};
    const originalFileIsImage =
        originalType === 'image' || (originalMime !== null && originalMime.indexOf('image/') === 0);

    return {
        sources,
        files,
        isImage: originalFileIsImage,
    };
}
