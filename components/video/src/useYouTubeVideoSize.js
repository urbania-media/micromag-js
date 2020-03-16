import { useEffect, useState } from 'react';
import { useGoogleApiClient } from '@micromag/core/contexts';

import { getYouTubeVideoSize } from './utils';

const useYouTubeVideoSize = (
    videoId,
    initialSize = {
        width: 0,
        height: 0,
    },
) => {
    const googleApiClient = useGoogleApiClient();
    const [size, setSize] = useState(initialSize);

    useEffect(() => {
        if (googleApiClient === null || videoId === null) {
            return;
        }
        getYouTubeVideoSize(googleApiClient.client, videoId).then(newSize => setSize(newSize));
    }, [googleApiClient, videoId]);

    return size;
};

export default useYouTubeVideoSize;
