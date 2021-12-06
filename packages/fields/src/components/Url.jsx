/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

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
    schemes: ['http://', 'https://', 'ftp://'],
    className: null,
    onChange: null,
};

const UrlField = ({ schemes, value, className, onChange }) => {
    const schemesPattern = useMemo(() => new RegExp(`^(${schemes.join('|')})`, 'i'), [schemes]);

    const scheme = useMemo(() => getScheme(value, schemesPattern) || schemes[0], [
        value,
        schemes,
        schemesPattern,
    ]);
    const valueWithoutScheme = useMemo(() => removeScheme(value, schemesPattern), [
        value,
        schemesPattern,
    ]);

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

    return (
        <InputGroup prepend={scheme} className={className}>
            <TextField value={valueWithoutScheme} onChange={onFieldChange} />
        </InputGroup>
    );
};

UrlField.propTypes = propTypes;
UrlField.defaultProps = defaultProps;

export default UrlField;
