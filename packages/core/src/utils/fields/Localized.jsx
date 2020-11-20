/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';

import * as AppPropTypes from '../../../lib/PropTypes';
import * as PanneauPropTypes from '../../../lib/panneau/PropTypes';
import { getComponentFromName } from '../../../lib/utils';
import * as FieldComponents from './index-localized';
import FormGroup from './FormGroup';
import Buttons from '../buttons/Buttons';
import Label from '../../partials/Label';

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    label: AppPropTypes.text,
    locales: PropTypes.arrayOf(PropTypes.string),
    properties: PropTypes.objectOf(PanneauPropTypes.field),
    fieldComponent: PropTypes.elementType,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    label: null,
    locales: null,
    properties: {},
    fieldComponent: null,
    className: null,
    onChange: null,
};

const LocalizedField = ({
    name,
    value,
    label,
    locales,
    properties,
    fieldComponent: providedFieldComponent,
    onChange,
    className,
}) => {
    const onFieldChange = useCallback(
        (locale, newFieldValue) => {
            const newValue = {
                ...value,
                [locale]: newFieldValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [onChange, value],
    );
    const [currentLocale, setCurrentLocale] = useState(locales.length > 0 ? locales[0] : null);
    return (
        <FormGroup
            label={
                <>
                    <Label>{label}</Label>
                    {locales.length > 1 ? (
                        <div className="ml-auto">
                            <Buttons
                                items={locales.map((locale) => ({
                                    id: locale,
                                    label: locale.toUpperCase(),
                                    active: locale === currentLocale,
                                    theme:
                                        value !== null && !isEmpty(value[locale] || null)
                                            ? 'success'
                                            : 'warning',
                                    onClick: () => setCurrentLocale(locale),
                                }))}
                                theme="secondary"
                                size="sm"
                                outline
                            />
                        </div>
                    ) : null}
                </>
            }
            className={className}
            labelClassName="d-flex align-items-center"
        >
            {locales.map((locale) => {
                const { name: propertyName = locale, component, ...property } = properties[locale] || {};
                const FieldComponent =
                    providedFieldComponent || getComponentFromName(FieldComponents, component);
                const fieldName = `${name}[${propertyName}]`;
                const fieldValue = value !== null ? value[propertyName] : null;
                return (
                    <div
                        key={`field-${locale}`}
                        className={classNames({
                            'd-none': currentLocale !== locale,
                        })}
                    >
                        <FieldComponent
                            {...property}
                            name={fieldName}
                            value={fieldValue}
                            onChange={(newValue) => onFieldChange(locale, newValue)}
                        />
                    </div>
                );
            })}
        </FormGroup>
    );
};

LocalizedField.propTypes = propTypes;
LocalizedField.defaultProps = defaultProps;

export default LocalizedField;
