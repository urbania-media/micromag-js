/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */ import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import FontStyle from './FontStyle';
import TextAlign from './TextAlign';

import styles from '../styles/font-style-with-align.module.scss';

const propTypes = {
    value: PropTypes.shape({}),
    fontStyleName: PropTypes.string,
    alignName: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    fontStyleName: 'fontStyle',
    alignName: 'align',
    value: null,
    className: null,
    onChange: null,
};

const FontStyles = ({ value, fontStyleName, alignName, className, onChange }) => {
    const fontStyleValue = value !== null ? value[fontStyleName] || null : null;
    const alignValue = value !== null ? value[alignName] || null : null;
    const onFontStyleChange = useCallback(
        (newFontStyleValue) => {
            const newValue = {
                ...value,
                [fontStyleName]: newFontStyleValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, fontStyleValue, fontStyleName, onChange],
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
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <FontStyle className={styles.item} buttonClassName={styles.button} value={fontStyleValue} onChange={onFontStyleChange} />
            <TextAlign className={styles.item} buttonClassName={styles.button} value={alignValue} onChange={onAlignChange} />
        </div>
    );
};

FontStyles.propTypes = propTypes;
FontStyles.defaultProps = defaultProps;

export default FontStyles;
