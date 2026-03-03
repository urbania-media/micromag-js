/* eslint-disable react/jsx-props-no-spreading */
import isString from 'lodash/isString';
import React from 'react';

import { getComponentFromName } from '../../utils';

import { useScreenRenderContext } from '../../contexts';
import Empty from '../partials/Empty';
import * as Placeholders from '../placeholders/index';

interface ScreenElementProps {
    children?: React.ReactNode;
    placeholder?: string | React.ReactNode;
    preview?: React.ReactNode;
    empty?: React.ReactNode;
    emptyLabel?: Label;
    isEmpty?: boolean;
    placeholderProps?: Record<string, unknown>;
    emptyClassName?: string;
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
}: ScreenElementProps) {
    const { isPlaceholder, isEdit, isPreview } = useScreenRenderContext();
    if (isPlaceholder) {
        const PlaceholderComponent = isString(placeholder)
            ? getComponentFromName(placeholder, Placeholders)
            : null;
        return PlaceholderComponent !== null ? (
            <PlaceholderComponent {...placeholderProps} />
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
