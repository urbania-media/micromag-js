import { ComponentType } from 'react';

import { Label, Target, Text } from './base';
import { ImageMedia } from './medias';

export type Errors = string | string[];
export type FormErrors = Record<string, Errors>;

export type Component = string | ComponentType;

export type ComponentsMap = Record<string, ComponentType>;

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

export interface Definition {
    id: string;
    component?: Component;
}

export interface Field {
    name?: string;
    type: string;
    label?: Text;
    isSection?: boolean;
    fields?: Field[];
}

export interface ScreenDefinition extends Definition {
    type: 'screen';
    title: Text;
    layouts?: string[];
    fields?: Field[];
}

export interface FieldDefinition extends Definition {
    id: string;
    fields?: Field[];
    settings?: Field[];
    [key: string]: unknown;
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
    id?: string | number;
    label?: Label;
    name?: string;
    theme?: ButtonTheme | null;
    size?: ButtonSize | null;
    href?: string | null;
    external?: boolean;
    direct?: boolean;
    target?: string;
    focusable?: boolean;
    active?: boolean;
    icon?: React.ReactNode | null;
    iconPosition?: 'left' | 'right' | 'inline';
    disabled?: boolean;
    className?: string | null;
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

export type ButtonLayout =
    | 'label-bottom'
    | 'label-top'
    | 'no-label'
    | 'label-over'
    | 'label-left'
    | 'label-right';

export interface User {
    id?: number;
    firstname?: string;
    lastname?: string;
    email?: string;
    gender?: string;
    birthdate?: string;
}

export interface SearchFilter {
    type?: string;
    value?: string | number;
}

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
