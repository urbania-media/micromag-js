import { AudioMedia, ClosedCaptionsMedia, ImageMedia, VideoMedia } from './medias';
import { BoxStyle, Color, TextStyle } from './styles';

export type StackDirection = 'horizontal' | 'vertical';
export type StackAlign = 'start' | 'center' | 'end';
export type StackSpacing = number | 'between' | 'evenly' | 'around';

export interface StackElement {
    direction?: StackDirection;
    align?: StackAlign;
    width?: number;
    height?: number;
    spacing?: StackSpacing;
    reverse?: boolean;
}

export interface GridElement {
    layout?: string[];
    spacing?: number;
}

export interface GeoPosition {
    lat?: number;
    lng?: number;
}

export interface Marker {
    id?: number;
    geoPosition?: GeoPosition;
    title?: HeadingElement;
    subtitle?: HeadingElement;
    description?: TextElement;
}

export interface MarkerWithImage extends Marker {
    image?: ImageMedia;
}

export interface Answer {
    id?: string;
    label?: TextElement;
}

export interface QuizAnswer extends Answer {
    good?: boolean;
}

export type CallToActionType = 'swipe-up' | 'button';

export interface CallToAction {
    active?: boolean;
    type?: CallToActionType;
    url?: string;
    label?: TextElement;
    buttonStyle?: BoxStyle;
}

export interface ShareIncentive {
    active?: boolean;
    label?: TextElement;
    boxStyle?: BoxStyle;
}

export interface ActiveForm {
    active?: boolean;
}

export interface Speaker {
    id?: string;
    name?: string;
    avatar?: ImageMedia;
    side?: 'left' | 'right';
    color?: Color;
}

export interface TimingOverrides {
    enabled?: boolean;
    appearDelay?: number;
    writingStateDuration?: number;
}

export interface ConversationMessage {
    speaker?: string;
    message?: string;
    image?: ImageMedia;
    audio?: AudioMedia;
    timingOverrides?: TimingOverrides;
}

export interface Conversation {
    speakers?: Speaker[];
    textStyle?: TextStyle;
    messages?: ConversationMessage[];
}

export interface Alternatives {
    audio?: AudioElement;
}

export interface TextElement {
    body?: string;
    textStyle?: TextStyle;
}

export type HeadingElement = TextElement;

export interface InputElement {
    label?: string;
    textStyle?: TextStyle;
}

export interface ImageElement {
    media?: ImageMedia;
}

export interface VideoElement {
    media?: VideoMedia;
    autoPlay?: boolean;
    loop?: boolean;
    closedCaptions?: ClosedCaptionsMedia;
    withSeekBar?: boolean;
    withControls?: boolean;
}

export interface VisualElement {
    media?: ImageMedia;
}

export interface AudioElement {
    media?: AudioMedia;
    autoPlay?: boolean;
    loop?: boolean;
    closedCaptions?: ClosedCaptionsMedia;
    withPlayPause?: boolean;
}

export interface ClosedCaptionsElement {
    media?: ClosedCaptionsMedia;
}

export interface BackgroundElement {
    color?: Color;
    image?: ImageMedia;
    video?: VideoMedia;
}

export interface ImageElementWithCaption {
    image?: ImageMedia;
    caption?: TextElement;
}

export interface AuthorElement {
    name?: TextElement;
    avatar?: ImageMedia;
}

export interface Badge {
    label?: TextElement;
    buttonStyle?: BoxStyle;
}

export interface CustomAnswer {
    active?: boolean;
    placeholder?: TextElement;
    textStyle?: TextStyle;
    boxStyle?: BoxStyle;
}

export interface Header {
    badge?: Badge;
}

export interface Footer {
    callToAction?: CallToAction;
}
export interface ClosedCaptions {
    file?: ClosedCaptionsMedia;
    textStyle?: TextStyle;
    boxStyle?: BoxStyle;
}
