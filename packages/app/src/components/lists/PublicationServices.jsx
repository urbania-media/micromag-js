/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import * as AppPropTypes from '../../lib/PropTypes';
import PublicationServiceItem from '../items/PublicationService';

const propTypes = {
    items: AppPropTypes.publicationServices,
    value: AppPropTypes.publicationServicesValue,
    className: PropTypes.string,
    onChange: PropTypes.bool,
};

const defaultProps = {
    items: [],
    value: null,
    className: null,
    onChange: null,
};

const PublicationServices = ({ items, value, className, onChange }) => {
    const onServiceChange = useCallback(
        ({ id }, newServiceValue) => {
            const newValue = {
                ...value,
                [id]: newServiceValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, onChange],
    );
    return (
        <ul
            className={classNames([
                'list-group',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {items.map((it) => (
                <PublicationServiceItem
                    key={`service-${it.id}`}
                    item={it}
                    value={value !== null ? value[it.id] || null : null}
                    onChange={(newValue) => onServiceChange(it, newValue)}
                />
            ))}
        </ul>
    );
};

PublicationServices.propTypes = propTypes;
PublicationServices.defaultProps = defaultProps;

export default PublicationServices;
