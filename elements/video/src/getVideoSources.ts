// h264 mp4 unless the host opts in to other formats with the setting `supportedVideoMimes`:
// webm was slower on mobile, HLS added latency between screens
export const DEFAULT_VIDEO_MIMES = ['video/mp4'];

export interface VideoSourceFile {
    handle?: string;
    id?: string;
    mime?: string;
    url?: string | null;
    size?: number;
    [key: string]: unknown;
}

export function getFileMime(file: VideoSourceFile): string {
    const { mime = null } = file;
    if (mime !== null) {
        return mime;
    }
    const handle = file.handle || file.id;
    return `video/${handle === 'h264' ? 'mp4' : handle}`;
}

/**
 * The files of a video media that can be used as `<source>`, smallest first, without the
 * original file when a transcoded one is available. Null when no file has a supported mime.
 */
export default function getVideoSources(
    files: VideoSourceFile[] | null,
    supportedMimes: string[] | null = DEFAULT_VIDEO_MIMES,
): VideoSourceFile[] | null {
    if (files === null || files.length === 0) {
        return null;
    }
    const mimes =
        supportedMimes !== null && supportedMimes.length > 0 ? supportedMimes : DEFAULT_VIDEO_MIMES;
    const supportedFiles = files.filter((file) => mimes.indexOf(getFileMime(file)) !== -1);
    const supportedFilesWithoutOriginal = supportedFiles.filter(
        (file) => (file.handle || file.id) !== 'original',
    );
    const sources = (
        supportedFilesWithoutOriginal.length > 0 ? supportedFilesWithoutOriginal : supportedFiles
    ).sort(({ size: a = Infinity }, { size: b = Infinity }) => {
        if (a === b) {
            return 0;
        }
        return a > b ? 1 : -1;
    });
    return sources.length > 0 ? sources : null;
}
