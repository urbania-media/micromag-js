import { ImageMedia } from './medias';
import { StoryTheme } from './story';

export interface DeviceScreen {
    name: string;
    mediaQuery?: string;
}

export interface ScreenSize {
    screen?: string;
    screens?: string[];
    width?: number;
    height?: number;
    landscape?: boolean;
}

export type RenderContext = 'view' | 'placeholder' | 'edit' | 'preview' | 'static' | 'capture';

export type TransitionName = 'fade' | 'scale' | 'slide';

export type TransitionEasing = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

export type Interaction = 'tap' | 'swipe';

export interface TransitionConfig {
    name: TransitionName;
    duration?: number;
    easing?: TransitionEasing;
}

export type Transition = TransitionName | TransitionConfig;

export interface Transitions {
    in?: Transition;
    out?: Transition;
}

export interface ViewerTheme extends StoryTheme {
    logo?: ImageMedia;
}

export interface Visitor {
    id?: string | number;
    name?: string;
}

export type TrackingVariables = Record<string, string | number | unknown[]>;
