
export type MediaElement = HTMLVideoElement | HTMLAudioElement | HTMLMediaElement;

/**
 * Medias
 */
export interface MediaMetadata {
    filename?: string;
    size?: number;
    mime?: string;
}

export interface MediaFile {
    id?: string;
    handle?: string;
    type?: string;
    mime?: string;
    url: string;
}

export interface Media {
    id?: string;
    type: string;
    url: string;
    thumbnail_url?: string;
    name?: string;
    metadata?: MediaMetadata;
    files?: Record<string, MediaFile>;
}

export type MediaType = 'image' | 'video' | 'audio' | 'closed-captions' | 'font';

export interface ImageMedia extends Omit<Media, 'type' | 'metadata'> {
    type?: 'image' | 'video';
    metadata?: MediaMetadata & {
        width?: number;
        height?: number;
    };
}

export interface FontMedia extends Omit<Media, 'type'> {
    type?: 'font';
}

export interface VideoMedia extends Omit<Media, 'type' | 'metadata'> {
    type?: 'video';
    metadata?: MediaMetadata & {
        width?: number;
        height?: number;
        duration?: number;
    };
}

export interface AudioMedia extends Omit<Media, 'type' | 'metadata'> {
    type?: 'audio';
    metadata?: MediaMetadata & {
        duration?: number;
    };
}

export interface ClosedCaptionsMedia extends Omit<Media, 'type'> {
    type?: 'closed-captions';
}
