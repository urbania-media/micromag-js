/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import * as AppPropTypes from '../../lib/PropTypes';
import StoryPublicationItem from '../items/StoryPublication';

const propTypes = {
    items: AppPropTypes.storyPublications,
    className: PropTypes.string,
    onServiceChange: PropTypes.bool,
};

const defaultProps = {
    items: [],
    className: null,
    onServiceChange: null,
};

const StoryPublications = ({ items, className, onServiceChange }) => (
    <ul
        className={classNames([
            'list-group',
            {
                [className]: className !== null,
            },
        ])}
    >
        {items.map(it => (
            <StoryPublicationItem
                key={`service-${it.id}`}
                item={it}
                onChange={value => onServiceChange(it, value)}
            />
        ))}
    </ul>
);

StoryPublications.propTypes = propTypes;
StoryPublications.defaultProps = defaultProps;

export default StoryPublications;
