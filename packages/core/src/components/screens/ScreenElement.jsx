/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';

import * as MicromagPropTypes from '../../PropTypes';
import { useScreenRenderContext } from '../../contexts/ScreenRenderContext';
import * as Placeholders from '../placeholders/index';
import Empty from '../partials/Empty';
import getComponentFromName from '../../utils/getComponentFromName';

const propTypes = {
    children: PropTypes.node,
    placeholder: PropTypes.oneOf([PropTypes.string, PropTypes.node]),
    preview: PropTypes.node,
    empty: PropTypes.node,
    emptyLabel: MicromagPropTypes.label,
    isEmpty: PropTypes.bool,
    placeholderClassName: PropTypes.string,
    emptyClassName: PropTypes.string,
};

const defaultProps = {
    children: null,
    placeholder: null,
    preview: null,
    empty: null,
    emptyLabel: null,
    isEmpty: false,
    placeholderClassName: null,
    emptyClassName: null,
};

const ScreenElement = ({
    children,
    placeholder,
    empty,
    emptyLabel,
    preview,
    isEmpty,
    placeholderClassName,
    emptyClassName,
}) => {
    const { isPlaceholder, isEdit, isPreview } = useScreenRenderContext();
    if (isPlaceholder) {
        // console.log(Placeholders, placeholder);
        const PlaceholderComponent = isString(placeholder)
            ? getComponentFromName(placeholder, Placeholders)
            : null;
        return PlaceholderComponent !== null ? (
            <PlaceholderComponent className={placeholderClassName} />
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
ScreenElement.defaultProps = defaultProps;

export default ScreenElement;
