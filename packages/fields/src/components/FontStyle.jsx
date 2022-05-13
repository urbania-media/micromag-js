/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { faBold } from '@fortawesome/free-solid-svg-icons/faBold';
import { faItalic } from '@fortawesome/free-solid-svg-icons/faItalic';
import { faUnderline } from '@fortawesome/free-solid-svg-icons/faUnderline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import Checkboxes from './Checkboxes';

const propTypes = {
    value: PropTypes.shape({}),
    options: PropTypes.arrayOf(
        PropTypes.shape({
            value: PropTypes.string,
            label: PropTypes.node,
        }),
    ),
    onChange: PropTypes.func,
};

const defaultProps = {
    options: [
        { value: 'bold', label: <FontAwesomeIcon icon={faBold} /> },
        { value: 'italic', label: <FontAwesomeIcon icon={faItalic} /> },
        { value: 'underline', label: <FontAwesomeIcon icon={faUnderline} /> },
    ],
    value: null,
    onChange: null,
};

const FontStyles = ({ value, options, onChange, ...props }) => {
    const styleKeys = useMemo(() => options.map((it) => it.value), [options]);
    const onInputChange = useCallback(
        (newStyleValue) => {
            const newValue = {
                ...value,
                ...styleKeys.reduce(
                    (valueMap, styleKey) => ({
                        ...valueMap,
                        [styleKey]:
                            newStyleValue !== null && newStyleValue.indexOf(styleKey) !== -1,
                    }),
                    {},
                ),
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, styleKeys, onChange],
    );
    return (
        <Checkboxes
            value={
                value !== null
                    ? Object.keys(value).reduce(
                          (values, styleKey) =>
                              styleKeys.indexOf(styleKey) !== -1 && value[styleKey] === true
                                  ? [...values, styleKey]
                                  : values,
                          [],
                      )
                    : null
            }
            options={options}
            onChange={onInputChange}
            {...props}
        />
    );
};

FontStyles.propTypes = propTypes;
FontStyles.defaultProps = defaultProps;

export default FontStyles;
