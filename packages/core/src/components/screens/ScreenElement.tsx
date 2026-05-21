import isString from 'lodash/isString';
import React from 'react';

import { getComponentFromName } from '../../utils';

import { useScreenRenderContext } from '../../contexts';
import { Label } from '../../types';
import Empty from '../partials/Empty';
import * as Placeholders from '../placeholders/index';

interface ScreenElementProps {
    children?: React.ReactNode | null;
    placeholder?: string | React.ReactNode | null;
    preview?: React.ReactNode | null;
    empty?: React.ReactNode | null;
    emptyLabel?: Label | null;
    isEmpty?: boolean;
    placeholderProps?: Record<string, unknown> | null;
    emptyClassName?: string | null;
    placeholderClassName?: string | null;
}

function ScreenElement({
    children = null,
    placeholder = null,
    empty = null,
    emptyLabel = null,
    preview = null,
    isEmpty = false,
    placeholderProps = null,
    emptyClassName = null,
    placeholderClassName = null,
}: ScreenElementProps) {
    const { isPlaceholder, isEdit, isPreview } = useScreenRenderContext();
    if (isPlaceholder) {
        const PlaceholderComponent = isString(placeholder)
            ? getComponentFromName(placeholder, Placeholders)
            : null;
        return PlaceholderComponent !== null ? (
            <PlaceholderComponent className={placeholderClassName} {...placeholderProps} />
        ) : (
            placeholder
        );
    }
    if (isEdit && isEmpty) {
        return empty !== null ? empty : <Empty className={emptyClassName}>{emptyLabel}</Empty>;
    }
    if (isPreview && preview !== null) {
        return preview;
    }
    return children;
}

export default ScreenElement;
