/* eslint-disable react/jsx-props-no-spreading */

import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import DatePicker, { registerLocale } from 'react-datepicker';
import { defineMessages, useIntl } from 'react-intl';
import formatDate from 'date-fns/format';
import parse from 'date-fns/parseISO';

import * as AppPropTypes from '../../../lib/PropTypes';
import { isMessage } from '../../../lib/utils';
import TextField from './Text';

const messages = defineMessages({
    time: {
        id: 'forms.time_label',
        defaultMessage: 'Time',
    },
});

const propTypes = {
    name: PropTypes.string,
    value: PropTypes.string,
    errors: AppPropTypes.formErrors,
    size: PropTypes.oneOf(['sm', 'lg']),
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    placeholder: AppPropTypes.text,
    dateFormat: PropTypes.string,
    withoutDate: PropTypes.bool,
    withoutTime: PropTypes.bool,
    timeFormat: PropTypes.string,
    timeCaption: AppPropTypes.text,
    timeIntervals: PropTypes.number,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    name: null,
    value: null,
    errors: null,
    size: null,
    required: false,
    disabled: false,
    placeholder: null,
    dateFormat: 'yyyy-MM-dd HH:mm:ss',
    withoutDate: false,
    withoutTime: false,
    timeFormat: 'HH:mm',
    timeCaption: messages.time,
    timeIntervals: 15,
    className: null,
    onChange: null,
};

const DateTimeField = ({
    name,
    value,
    errors,
    size,
    required,
    disabled,
    placeholder,
    dateFormat,
    withoutDate,
    withoutTime,
    timeFormat,
    timeCaption,
    timeIntervals,
    onChange,
    className,
}) => {
    const { locale, formatMessage } = useIntl();
    const [dateValue, setDateValue] = useState(value !== null ? parse(value) : null);
    const [loadedLocale, setLoadedLocale] = useState(null);
    const onDateChange = useCallback(
        (newDate) => {
            setDateValue(newDate);
            const strValue = newDate !== null ? formatDate(newDate, dateFormat) : null;
            if (onChange !== null) {
                onChange(strValue);
            }
        },
        [setDateValue, dateFormat, onChange],
    );
    useEffect(() => {
        const localeName = `${locale}-CA`;
        const loader =
            locale === 'fr' ? import('date-fns/locale/fr-CA') : import('date-fns/locale/en-CA');
        loader.then(({ default: localePackage }) => {
            registerLocale(localeName, localePackage);
            setLoadedLocale(localeName);
        });
    }, [locale, setLoadedLocale]);
    return (
        <DatePicker
            selected={dateValue}
            onChange={onDateChange}
            showTimeSelect={!withoutTime}
            showTimeSelectOnly={withoutDate}
            disabled={disabled}
            customInput={
                <TextField
                    name={name}
                    size={size}
                    errors={errors}
                    required={required}
                    className={className}
                    readOnly
                    disabled={disabled}
                    nativeOnChange
                />
            }
            placeholderText={isMessage(placeholder) ? formatMessage(placeholder) : placeholder}
            dateFormat={dateFormat}
            locale={loadedLocale}
            timeFormat={timeFormat}
            timeCaption={isMessage(timeCaption) ? formatMessage(timeCaption) : timeCaption}
            timeIntervals={timeIntervals}
        />
    );
};

DateTimeField.propTypes = propTypes;
DateTimeField.defaultProps = defaultProps;

export default DateTimeField;
