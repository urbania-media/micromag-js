/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import * as AppPropTypes from '../../lib/PropTypes';
import PublishServiceItem from '../items/PublishService';

const messages = defineMessages({});

const propTypes = {
    items: AppPropTypes.publishServices,
    className: PropTypes.string,
    onServiceChange: PropTypes.bool,
};

const defaultProps = {
    items: [],
    className: null,
    onServiceChange: null,
};

const PublishServices = ({ items, className, onServiceChange }) => (
    <ul
        className={classNames([
            'list-group',
            {
                [className]: className !== null,
            },
        ])}
    >
        {items.map(it => (
            <PublishServiceItem
                key={`service-${it.id}`}
                item={it}
                onChange={value => onServiceChange(it, value)}
            />
        ))}
    </ul>
);

PublishServices.propTypes = propTypes;
PublishServices.defaultProps = defaultProps;

export default PublishServices;
