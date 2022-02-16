/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useMemo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isObject from 'lodash/isObject';
import { FormattedMessage, useIntl } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getFontFamilyFromFont } from '@micromag/core/utils';
import { useFonts } from '@micromag/core/contexts';
import { useLoadedFonts } from '@micromag/core/hooks';

import FieldWithForm from './FieldWithForm';

const normalize = (str) =>
    str
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');

const fontEquals = (fontA, fontB) =>
    fontA === fontB ||
    (isObject(fontA) && isObject(fontB) && fontA.type === fontB.type && fontA.name === fontB.name);

const propTypes = {
    value: MicromagPropTypes.font,
    isForm: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    maxFontsVisible: PropTypes.number,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    isHorizontal: false,
    maxFontsVisible: 10,
    className: null,
    onChange: null,
    closeForm: null,
};

const FontFamily = ({ value, onChange, closeForm, maxFontsVisible, isForm, ...props }) => {
    const intl = useIntl();
    const { systemFonts, googleFonts, customFonts } = useFonts();
    const valueName = value !== null && isObject(value) ? value.name || null : value;
    const [search, setSearch] = useState({});
    const onSearchChange = useCallback(
        (id, newValue) =>
            setSearch({
                ...search,
                [id]: newValue,
            }),
        [search, setSearch],
    );
    const fontsGroups = useMemo(
        () =>
            [
                customFonts !== null && customFonts.length > 0
                    ? {
                          id: 'custom',
                          title: (
                              <FormattedMessage
                                  defaultMessage="Custom fonts"
                                  description="Font family group title"
                              />
                          ),
                          fonts: customFonts,
                      }
                    : null,
                systemFonts !== null && systemFonts.length > 0
                    ? {
                          id: 'system',
                          title: (
                              <FormattedMessage
                                  defaultMessage="Default fonts"
                                  description="Font family group title"
                              />
                          ),
                          fonts: systemFonts,
                      }
                    : null,
                googleFonts !== null && googleFonts.length > 0
                    ? {
                          id: 'google',
                          title: (
                              <FormattedMessage
                                  defaultMessage="Google Fonts"
                                  description="Font family group title"
                              />
                          ),
                          fonts: googleFonts,
                      }
                    : null,
            ]
                .filter((it) => it !== null)
                .map(({ id, fonts, ...fontGroup }) => {
                    const hasSearch = fonts.length > maxFontsVisible;
                    const currentSearch = search[id] || null;
                    const searchNormalized =
                        currentSearch !== null ? normalize(currentSearch) : null;
                    const addedValueFont =
                        hasSearch && value !== null
                            ? fonts.find((font) => fontEquals(font, value)) || null
                            : null;
                    const filteredFonts = hasSearch
                        ? fonts
                              .filter(
                                  (font) =>
                                      (searchNormalized === null ||
                                          normalize(isObject(font) ? font.name : font).indexOf(
                                              searchNormalized,
                                          ) !== -1) &&
                                      (addedValueFont === null ||
                                          !fontEquals(addedValueFont, font)),
                              )
                              .slice(0, maxFontsVisible)
                        : fonts;
                    return {
                        id,
                        fonts:
                            addedValueFont !== null
                                ? [addedValueFont, ...filteredFonts]
                                : filteredFonts,
                        currentSearch,
                        hasSearch,
                        ...fontGroup,
                    };
                }),
        [systemFonts, googleFonts, customFonts, value, search],
    );

    const fontsToLoad = useMemo(
        () =>
            isForm
                ? fontsGroups.reduce((allFonts, { fonts }) => [...allFonts, ...fonts], [])
                : [value].filter((it) => it !== null),
        [fontsGroups],
    );
    useLoadedFonts(fontsToLoad);

    return (
        <FieldWithForm
            value={value}
            onChange={onChange}
            label={valueName}
            thumbnail={
                value !== null ? (
                    <strong
                        className={classNames(['d-inline-block'])}
                        style={{ fontFamily: getFontFamilyFromFont(value) }}
                    >
                        Aa
                    </strong>
                ) : null
            }
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Select a font family..."
                    description="No value label"
                />
            }
            isForm={isForm}
            {...props}
        >
            <div className="p-2">
                {fontsGroups.map(({ id, title, fonts, hasSearch, currentSearch }, index) => (
                    <div className={index > 0 ? 'mt-4' : null} key={`font-${id}`}>
                        <h6>{title}</h6>
                        <div className="list-group">
                            {hasSearch ? (
                                <div className={classNames(['list-group-item', 'px-2', 'py-2'])}>
                                    <input
                                        type="search"
                                        className="form-control"
                                        value={currentSearch || ''}
                                        placeholder={intl.formatMessage({
                                            defaultMessage: 'Search fonts...',
                                            description: 'Field placeholder',
                                        })}
                                        onChange={(e) => onSearchChange(id, e.currentTarget.value)}
                                    />
                                </div>
                            ) : null}
                            {fonts.map((font) => {
                                const { name } = isObject(font) ? font : { name: font };
                                return (
                                    <button
                                        key={`font-${id}-${name}`}
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
                                            className="me-4"
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
        </FieldWithForm>
    );
};

FontFamily.propTypes = propTypes;
FontFamily.defaultProps = defaultProps;
FontFamily.withForm = true;

export default FontFamily;
