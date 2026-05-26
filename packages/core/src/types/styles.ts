import { FontMedia } from './medias';

/**
 * Style
 */
export interface CustomFont {
    type?: 'system' | 'google' | 'custom';
    name?: string;
    media?: FontMedia;
    variants?: string[] | { fvd?: string; weight?: number; style?: string }[];
}

export type Font = CustomFont | string;

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

export interface HighlightStyle {
    color?: Color;
    textColor?: Color;
}

export interface LinkStyle {
    color?: Color;
    fontStyle?: FontStyle;
}
export interface TextStyle {
    fontFamily?: Font;
    fontSize?: number;
    fontStyle?: FontStyle;
    align?: TextAlign;
    color?: Color;
    letterSpacing?: number;
    lineHeight?: number;
    link?: LinkStyle;
    highlight?: HighlightStyle;
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

export interface Padding {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
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
