/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import React, { useMemo, useCallback, useState, useEffect } from 'react';
import InputGroup from './InputGroup';
import TextField from './Text';

const getScheme = (url, schemesPattern) => {
    const match = url !== null ? url.match(schemesPattern) : null;
    return match !== null && match[1].length !== url.length ? match[1].toLowerCase() : null;
};

const removeScheme = (url, schemesPattern) =>
    url !== null ? url.replace(schemesPattern, '') : null;

const withScheme = (url, prefix, schemesPattern) =>
    url !== null && !url.match(schemesPattern) ? `${prefix}${url}` : url;

const propTypes = {
    value: PropTypes.string,
    schemes: PropTypes.arrayOf(PropTypes.string),
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    schemes: ['https://', 'http://'],
    className: null,
    onChange: null,
};

const UrlField = ({ schemes, value, className, onChange }) => {
    const empty = isEmpty(value);

    const [open, setOpen] = useState(false);
    useEffect(() => {
        setOpen(false);
    }, [value]);

    const schemesPattern = useMemo(() => new RegExp(`^(${schemes.join('|')})`, 'i'), [schemes]);

    const scheme = useMemo(
        () => getScheme(value, schemesPattern) || schemes[0],
        [value, schemes, schemesPattern],
    );

    const valueWithoutScheme = useMemo(
        () => removeScheme(value, schemesPattern),
        [value, schemesPattern],
    );

    const onFieldChange = useCallback(
        (newValue) => {
            const valueWithScheme = !isEmpty(newValue)
                ? withScheme(newValue, scheme, schemesPattern)
                : null;
            if (onChange !== null) {
                onChange(valueWithScheme);
            }
        },
        [onChange, scheme, schemesPattern],
    );

    const onClickOpen = useCallback(() => {
        setOpen(!open);
    }, [open, setOpen]);

    const onClickScheme = useCallback(
        (sch) => {
            setOpen(false);
            const newValueWithScheme = !isEmpty(value)
                ? withScheme(valueWithoutScheme, sch, schemesPattern)
                : null;
            if (onChange !== null) {
                onChange(newValueWithScheme);
            }
        },
        [open, setOpen, schemesPattern, valueWithoutScheme, onChange],
    );

    const prepend = (
        <>
            <button
                className={classNames([
                    'btn',
                    'btn-outline-secondary',
                    'fw-normal',
                    {
                        show: open,
                        disabled: empty,
                        'dropdown-toggle': !empty,
                    },
                ])}
                type="button"
                aria-expanded={open ? 'false' : 'true'}
                onClick={!empty ? onClickOpen : null}
            >
                {scheme}
            </button>
            <ul className={classNames(['dropdown-menu', { show: open }])}>
                {schemes.map((sch) => (
                    <li key={`scheme-${sch}`}>
                        <button
                            className={classNames(['dropdown-item', { active: sch === scheme }])}
                            type="button"
                            onClick={() => onClickScheme(sch)}
                        >
                            {sch}
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
    return (
        <InputGroup prepend={prepend} className={className}>
            <TextField value={valueWithoutScheme} onChange={onFieldChange} />
        </InputGroup>
    );
};

UrlField.propTypes = propTypes;
UrlField.defaultProps = defaultProps;

export default UrlField;
