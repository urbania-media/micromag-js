import { BackgroundElement } from './elements';
import { ImageMedia, Media } from './medias';
import { BoxStyle, Color, FontObject, TextStyle } from './styles';

export interface ComponentMetadata {
    title?: string;
    description?: string;
    [key: string]: unknown;
}
export interface ComponentParameters {
    metadata?: ComponentMetadata;
    [key: string]: unknown;
}
export interface StoryComponent {
    id: string;
    type: string;
    parameters?: ComponentParameters;
    background?: BackgroundElement;
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
    boxStyles?: Record<string, BoxStyle>;
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
    fonts?: Record<string, FontObject> | FontObject[];
    medias?: Record<string, Media>;
}
