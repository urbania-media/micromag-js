import type { ReactNode, CSSProperties, Ref as ReactRef } from 'react';

/**
 * Core
 */
export interface History {
    listen: (...args: unknown[]) => void;
    push: (path: string, state?: unknown) => void;
}

export interface Location {
    pathname?: string;
    search?: string;
}

export interface Intl {
    locale: string;
    formatMessage: (...args: unknown[]) => string;
}

export interface DefaultMessageContent {
    type?: number;
    value?: string;
}

export type DefaultMessage = string | DefaultMessageContent[];

export interface Message {
    id?: string;
    defaultMessage: DefaultMessage;
    description?: string;
}

export type Text = Message | string;

export type Label = Message | ReactNode;

export type StatusCode = 401 | 403 | 404 | 500;

export type Ref<T = unknown> = ReactRef<T>;

export type Target = '_blank' | '_self' | '_parent';

export type Interaction = 'tap' | 'swipe';

export type TrackingVariables = Record<string, string | number | unknown[]>;

export interface Progress {
    currentTime?: number;
    duration?: number;
}

/**
 * Site
 */
export interface User {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    gender?: string;
    birthdate?: string;
}

export interface MenuItem {
    id?: number | string;
    label?: Label;
    url?: string;
    external?: boolean;
    active?: boolean;
}

export interface Breadcrumb {
    label?: Label;
    url?: string;
}

export interface Device {
    id: string;
}

export interface Modal {
    id: string;
}

export interface Panel {
    id: string;
}

export interface Button {
    label?: Label;
    onClick?: (...args: unknown[]) => void;
}

export type BootstrapTheme =
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';

export type ButtonTheme =
    | BootstrapTheme
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-light'
    | 'outline-dark'
    | 'outline-link'
    | null;

export type ButtonSize = 'lg' | 'sm' | null;

export type FormControlSize = 'lg' | 'sm' | null;

export type DropdownAlign = 'start' | 'end';

export type Component = Record<string, unknown> | ((...args: unknown[]) => unknown);

/**
 * Forms
 */
export type Errors = string | string[];
export type FormErrors = Record<string, Errors>;

export type SelectOption =
    | string
    | {
          value: unknown;
          label?: Label;
      };

export interface FormField {
    name?: string;
    component?: Component;
}

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
    url?: string;
}

export interface Media {
    id?: string;
    type: string;
    url?: string;
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

/**
 * Style
 */
export interface CustomFont {
    type?: 'system' | 'google' | 'custom';
    name?: string;
    media?: FontMedia;
}

export type Font = Record<string, unknown> | string;

export type TextAlign = 'left' | 'right' | 'center';

export interface ColorObject {
    color?: string;
    alpha?: number;
}

export type Color = ColorObject | string;

export interface FontStyle {
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    upperCase?: boolean;
}

export interface TextStyle {
    fontFamily?: Font;
    fontSize?: number;
    fontStyle?: FontStyle;
    align?: TextAlign;
    color?: Color;
    letterSpacing?: number;
    lineHeight?: number;
}

export type BorderType =
    | 'dotted'
    | 'dashed'
    | 'solid'
    | 'double'
    | 'groove'
    | 'ridge'
    | 'inset'
    | 'outset'
    | 'hidden';

export interface ShadowType {
    shadowDistance?: number;
    shadowBlur?: number;
    shadowColor?: Color;
}

export interface BorderStyle {
    width?: number;
    style?: BorderType;
    radius?: number;
    color?: Color;
}

export interface BoxStyle {
    backgroundColor?: Color;
    borderRadius?: number;
    borderWidth?: number;
    borderColor?: Color;
    borderStyle?: BorderType;
    shadow?: ShadowType;
}

export interface Margin {
    top?: number;
    bottom?: number;
}

export interface GridLayoutItem {
    rows?: number | number[];
    columns?: number | number[];
}

export type GridLayout = GridLayoutItem[];

export type ObjectFitSize = 'cover' | 'contain' | null;

export interface ObjectFit {
    fit?: ObjectFitSize;
    horizontalPosition?: 'left' | 'center' | 'right';
    verticalPosition?: 'top' | 'center' | 'bottom';
}

/**
 * Elements
 */
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

/**
 * Definitions
 */
export interface Field {
    name?: string;
    type: string;
    label?: Text;
    isSection?: boolean;
    fields?: Field[];
}

export interface ScreenDefinition {
    id: string;
    type: 'screen';
    title: Text;
    layouts?: string[];
    fields?: Field[];
}

export interface FieldDefinition {
    id: string;
    type: 'field';
    title: Text;
    fields?: Field[];
}

/**
 * Components
 */
export interface StoryComponent {
    type: string;
    [key: string]: unknown;
}

export type ScreenComponent = StoryComponent;

/**
 * Theme
 */
export interface Theme {
    id?: string;
    textStyles?: Record<string, TextStyle>;
    background?: BackgroundElement;
    colors?: Record<string, Color>;
    components?: ScreenComponent[];
}

export interface ViewerTheme extends Theme {
    logo?: ImageMedia;
}

/**
 * Metadata
 */
export interface Metadata {
    description?: string;
    shareUrl?: string;
    shareImage?: ImageMedia;
    favIcon?: ImageMedia;
}

export interface Tag {
    label?: string;
    value?: number | string;
}

/**
 * Story
 */
export interface Story {
    id?: string;
    theme?: Theme;
    components?: ScreenComponent[];
    metadata?: Metadata;
}

/**
 * Render
 */
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

/**
 * Screens
 */
export interface AdFormats {
    width?: number;
    height?: number;
}

export interface AdFormat {
    width?: number;
    height?: number;
    url?: string;
    target?: Target;
    iframe?: string;
    image?: ImageMedia;
}

export interface AudioComponent {
    src?: string;
    track?: string;
    trackLng?: number;
    controls?: boolean;
}

export interface Slide {
    image?: ImageMedia;
    text?: string;
}

export type ContainerStyle = Record<string, unknown>;

/**
 * Transitions
 */
export type TransitionName = 'fade' | 'scale' | 'slide';

export type TransitionEasing = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';

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

/**
 * Search
 */
export interface SearchFilter {
    type?: string;
    value?: string | number;
}

/**
 * Payments
 */
export interface PaymentItem {
    id?: string | number;
    date?: string;
    type?: string;
    invoice_link?: string;
    amount?: string | number;
}

/**
 * Page Metadata
 */
export interface PageMetadata {
    canonical?: string;
    description?: string;
    keywords?: string | string[];
    image?: { url?: string };
    favicon?: { url?: string };
    rssUrl?: string;
    atomUrl?: string;
    microformats?: Record<string, unknown>[];
}

export interface AuthorElement {
    name?: TextElement;
    avatar?: { url?: string };
}

export interface Visitor {
    id?: string | number;
    name?: string;
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

export type Reload = Record<string, unknown>;

export interface ClosedCaptions {
    file?: ClosedCaptionsMedia;
    textStyle?: TextStyle;
    boxStyle?: BoxStyle;
}

export type ButtonLayout =
    | 'label-bottom'
    | 'label-top'
    | 'no-label'
    | 'label-over'
    | 'label-left'
    | 'label-right';
