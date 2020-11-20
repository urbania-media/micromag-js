/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBold,
    faItalic,
    faUnderline,
    faAlignLeft,
    faAlignCenter,
    faAlignRight,
} from '@fortawesome/free-solid-svg-icons';

import Checkboxes from './Checkboxes';
import Radios from './Radios';

const propTypes = {
    value: PropTypes.shape({}),
    fontStyleName: PropTypes.string,
    alignName: PropTypes.string,
    stylesOptions: PropTypes.arrayOf(PropTypes.object),
    alignOptions: PropTypes.arrayOf(PropTypes.object),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    fontStyleName: 'fontStyle',
    alignName: 'align',
    stylesOptions: [
        { value: 'bold', label: <FontAwesomeIcon icon={faBold} /> },
        { value: 'italic', label: <FontAwesomeIcon icon={faItalic} /> },
        { value: 'underline', label: <FontAwesomeIcon icon={faUnderline} /> },
    ],
    alignOptions: [
        { value: 'left', label: <FontAwesomeIcon icon={faAlignLeft} /> },
        { value: 'center', label: <FontAwesomeIcon icon={faAlignCenter} /> },
        { value: 'right', label: <FontAwesomeIcon icon={faAlignRight} /> },
    ],
    value: null,
    className: null,
    onChange: null,
};

const FontStyles = ({
    value,
    fontStyleName,
    alignName,
    stylesOptions,
    alignOptions,
    className,
    onChange,
}) => {
    const styleKeys = useMemo(() => stylesOptions.map((it) => it.value), [stylesOptions]);
    const fontStyleValue = value !== null ? value[fontStyleName] || null : null;
    const alignValue = value !== null ? value[alignName] || null : null;
    const onFontStyleChange = useCallback(
        (newFontStyleValue) => {
            const newValue = {
                ...value,
                [fontStyleName]: {
                    ...fontStyleValue,
                    ...styleKeys.reduce(
                        (valueMap, styleKey) => ({
                            ...valueMap,
                            [styleKey]:
                                newFontStyleValue !== null &&
                                newFontStyleValue.indexOf(styleKey) !== -1,
                        }),
                        {},
                    ),
                },
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, styleKeys, fontStyleValue, fontStyleName, onChange],
    );
    const onAlignChange = useCallback(
        (newAlignValue) => {
            const newValue = {
                ...value,
                [alignName]: newAlignValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, alignName, onChange],
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
            <Radios
                value={alignValue}
                options={options}
                className="ml-auto"
                onChange={onAlignChange}
            />
        </div>
    );
};

FontStyles.propTypes = propTypes;
FontStyles.defaultProps = defaultProps;

export default FontStyles;
