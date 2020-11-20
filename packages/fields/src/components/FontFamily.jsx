/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isObject from 'lodash/isObject';
import { FormattedMessage } from 'react-intl';
import { getFontFamilyFromFont } from '@micromag/core/utils';
import { useTheme } from '@micromag/core/contexts';

// import * as AppPropTypes from '../../lib/PropTypes';

import styles from '../styles/font-family.module.scss';

const propTypes = {
    systemFonts: PropTypes.arrayOf(PropTypes.string),
    isForm: PropTypes.bool,
    value: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    systemFonts: ['Arial', 'Courier', 'Georgia', 'Helvetica', 'Times New Roman'],
    isForm: false,
    value: null,
    className: null,
    onChange: null,
    closeForm: null,
};

const FontFamily = ({ systemFonts, value, isForm, className, onChange, closeForm }) => {
    const { fonts: brandingFonts = [] } = useTheme();
    const valueName = value !== null && isObject(value) ? value.name || null : value;
    const fontsGroups = useMemo(
        () => [
            {
                title: (
                    <FormattedMessage defaultMessage="All" description="Font family group title" />
                ),
                fonts: systemFonts,
            },
        ],
        [brandingFonts, systemFonts],
    );
    return isForm ? (
        <div className={styles.form}>
            {fontsGroups.map(({ title, fonts }) => (
                <div>
                    <h4>{title}</h4>
                    <div className="list-group">
                        {fonts.map((font) => {
                            const { name } = isObject(font)
                                ? font
                                : {
                                      name: font,
                                  };
                            return (
                                <button
                                    key={`font-${name}`}
                                    type="button"
                                    className={classNames([
                                        'list-group-item',
                                        'list-group-item-action',
                                        'px-2',
                                        'py-2',
                                        {
                                            active: valueName === name,
                                        },
                                    ])}
                                    onClick={() => {
                                        onChange(font);
                                        closeForm();
                                    }}
                                >
                                    <strong
                                        className="mr-4"
                                        style={{ fontFamily: getFontFamilyFromFont(font) }}
                                    >
                                        Aa
                                    </strong>
                                    <span className={styles.label}>{name}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {value !== null ? (
                <>
                    <span className={classNames([styles.value, 'mr-2'])}>{valueName}</span>
                    <strong style={{ fontFamily: getFontFamilyFromFont(value) }}>Aa</strong>
                </>
            ) : (
                <span className={styles.noValue}>
                    <FormattedMessage
                        defaultMessage="Select a font family..."
                        description="No value label"
                    />
                </span>
            )}
        </div>
    );
};

FontFamily.propTypes = propTypes;
FontFamily.defaultProps = defaultProps;
FontFamily.withForm = true;

export default FontFamily;
