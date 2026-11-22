// webm is opt-in (setting `supportedVideoMimes`): it was slower than h264 on mobile
// const possibleMimes = ['video/webm', 'video/mp4', 'video/ogg', 'application/vnd.apple.mpegurl'];
const possibleMimes = ['video/mp4'];

// Answers of canPlayType() by mime: the first call used to be cached for every list of mimes
const canPlayByMime = new Map<string, boolean>();

function canPlayMime(mime: string): boolean {
    if (!canPlayByMime.has(mime)) {
        if (typeof document === 'undefined') {
            return false;
        }
        const video = document.createElement('video');
        canPlayByMime.set(mime, video.canPlayType(mime) !== '');
    }
    return canPlayByMime.get(mime) || false;
}

function getVideoSupportedMimes(mimes: string[] | null = possibleMimes): string[] {
    return (mimes || possibleMimes).filter((mime) => canPlayMime(mime));
}

export default getVideoSupportedMimes;
