/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';

import Radios from './Radios';

const propTypes = {
    value: PropTypes.shape({}),
    fontStyleName: PropTypes.string,
    transformOptions: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    fontStyleName: 'fontStyle',
    transformOptions: [
        { value: 'capitalize', label: <strong>Aa</strong> },
        { value: 'uppercase', label: <strong>AA</strong> },
        { value: 'lowercase', label: <strong>aa</strong> },
    ],
    value: null,
    className: null,
    onChange: null,
};

const FontStyleTransform = ({ value, fontStyleName, transformOptions, className, onChange }) => {
    const fontStyleValue = value !== null ? value[fontStyleName] || null : null;
    const transformValue = fontStyleValue !== null ? fontStyleValue.transform || null : null;
    const onTransformChange = useCallback(
        (newTransformValue) => {
            const newValue = {
                ...value,
                [fontStyleName]: {
                    ...fontStyleValue,
                    transform: newTransformValue,
                },
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, fontStyleValue, fontStyleName, onChange],
    );
    return (
        <div
            className={classNames([
                'd-flex',
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div
                className={classNames([
                    'd-inline-flex', 'ml-auto'
                ])}
            >
                <Radios
                    value={transformValue}
                    options={transformOptions}
                    onChange={onTransformChange}
                    uncheckable
                />
            </div>
        </div>
    );
};

FontStyleTransform.propTypes = propTypes;
FontStyleTransform.defaultProps = defaultProps;
FontStyleTransform.isHorizontal = true;

export default FontStyleTransform;
