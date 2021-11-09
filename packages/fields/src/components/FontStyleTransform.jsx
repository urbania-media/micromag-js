/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import TextTransform from './TextTransform';

const propTypes = {
    value: PropTypes.shape({}),
    transformName: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    transformName: 'transform',
    value: null,
    onChange: null,
};

const FontStyleTransform = ({ value, transformName, onChange, ...props }) => {
    const transformValue = value !== null ? value[transformName] || null : null;
    const onTransformChange = useCallback(
        (newTransformValue) => {
            const newValue = {
                ...value,
                [transformName]: newTransformValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, transformName, onChange],
    );
    return <TextTransform value={transformValue} onChange={onTransformChange} {...props} />;
};

FontStyleTransform.propTypes = propTypes;
FontStyleTransform.defaultProps = defaultProps;
FontStyleTransform.isHorizontal = true;

export default FontStyleTransform;
