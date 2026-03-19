import { BackgroundElement } from './elements';
import { ImageMedia } from './medias';
import { Color, TextStyle } from './styles';

export interface StoryComponent {
    type: string;
    [key: string]: unknown;
}

export type ScreenComponent = StoryComponent;

export interface StoryMetadata {
    description?: string;
    shareUrl?: string;
    shareImage?: ImageMedia;
    favIcon?: ImageMedia;
}

export interface StoryTheme {
    id?: string;
    textStyles?: Record<string, TextStyle>;
    background?: BackgroundElement;
    colors?: Record<string, Color>;
    components?: ScreenComponent[];
}

export interface Story {
    id?: string;
    theme?: StoryTheme;
    components?: ScreenComponent[];
    metadata?: StoryMetadata;
}
