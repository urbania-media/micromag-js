/* eslint-disable react/jsx-props-no-spreading */
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '../../lib';
import { getComponentFromName } from '../../utils';

import { useScreenRenderContext } from '../../contexts';
import Empty from '../partials/Empty';
import * as Placeholders from '../placeholders/index';

const propTypes = {
    children: PropTypes.node,
    placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    preview: PropTypes.node,
    empty: PropTypes.node,
    emptyLabel: MicromagPropTypes.label,
    isEmpty: PropTypes.bool,
    placeholderProps: PropTypes.object, // eslint-disable-line
    emptyClassName: PropTypes.string,
};

const ScreenElement = ({
    children = null,
    placeholder = null,
    empty = null,
    emptyLabel = null,
    preview = null,
    isEmpty = false,
    placeholderProps = null,
    emptyClassName = null,
}) => {
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
};

ScreenElement.propTypes = propTypes;

export default ScreenElement;
