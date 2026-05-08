import { BackgroundElement } from './elements';
import { ImageMedia } from './medias';
import { Color, TextStyle } from './styles';

export interface StoryComponent {
    id: string;
    type: string;
    [key: string]: unknown;
}

export type ScreenComponent = StoryComponent;

export interface StoryMetadata {
    description?: string;
    shareUrl?: string;
    shareImage?: ImageMedia;
    favIcon?: ImageMedia;
    language?: string;
}

export interface StoryTheme {
    id?: string;
    textStyles?: Record<string, TextStyle>;
    background?: BackgroundElement;
    colors?: Record<string, Color>;
    components?: ScreenComponent[];
}

export interface Organisation {
    slug?: string;
    name?: string;
    tracking?: TrackingSettings;
}

export interface TrackingCode {
    id: string;
    type: string;
}

export interface TrackingSettings {
    codes?: TrackingCode[];
}

export interface StorySettings {
    tracking?: TrackingSettings;
}

export interface Story {
    id?: string;
    title?: string;
    slug?: string;
    document_id?: string;
    theme?: StoryTheme;
    components?: ScreenComponent[];
    metadata?: StoryMetadata;
    settings?: StorySettings;
    organisation?: Organisation;
}
