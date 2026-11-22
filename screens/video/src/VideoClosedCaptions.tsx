import { ComponentProps, useSyncExternalStore } from 'react';

import ClosedCaptions from '@micromag/element-closed-captions';

import type { TimeStore } from './createTimeStore';

interface VideoClosedCaptionsProps extends Omit<
    ComponentProps<typeof ClosedCaptions>,
    'currentTime'
> {
    timeStore: TimeStore;
}

/**
 * Closed captions that follow the current time of the video. Reading the time here, and not in the
 * screen, renders only the captions at each `timeupdate` of the video.
 */
function VideoClosedCaptions({ timeStore, ...props }: VideoClosedCaptionsProps) {
    const currentTime = useSyncExternalStore(timeStore.subscribe, timeStore.get, timeStore.get);
    return <ClosedCaptions {...props} currentTime={currentTime} />;
}

export default VideoClosedCaptions;
