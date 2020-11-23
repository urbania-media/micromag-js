/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isObject from 'lodash/isObject';
import { FormattedMessage } from 'react-intl';
import { getFontFamilyFromFont } from '@micromag/core/utils';
import { useTheme } from '@micromag/core/contexts';

// import * as AppPropTypes from '../../lib/PropTypes';

const propTypes = {
    value: PropTypes.string,
    systemFonts: PropTypes.arrayOf(PropTypes.string),
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    systemFonts: ['Arial', 'Courier', 'Georgia', 'Helvetica', 'Times New Roman'],
    isForm: false,
    isHorizontal: false,
    className: null,
    onChange: null,
    closeForm: null,
};

const FontFamily = ({
    systemFonts,
    value,
    isForm,
    isHorizontal,
    className,
    onChange,
    closeForm,
}) => {
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

    if (isForm) {
        return (
            <div className="p-2">
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
                                        <span>{name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div
            className={classNames([
                'd-flex',
                'align-items-center',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {value !== null ? (
                <>
                    {isHorizontal ? (
                        <span
                            className={classNames([
                                'text-monospace',
                                'text-truncate',
                                'small',
                                'mr-2',
                            ])}
                        >
                            {valueName}
                        </span>
                    ) : null}
                    <strong
                        className={classNames(['d-inline-block'])}
                        style={{ fontFamily: getFontFamilyFromFont(value) }}
                    >
                        Aa
                    </strong>
                    {!isHorizontal ? (
                        <span className={classNames(['text-monospace', 'text-truncate', 'ml-2'])}>
                            {valueName}
                        </span>
                    ) : null}
                </>
            ) : (
                <span className="text-muted">
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
