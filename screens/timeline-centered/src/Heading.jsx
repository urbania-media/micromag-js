/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { title, description } from '../../../.storybook/data';

import TimelineCenteredComponent from './TimelineCenteredComponent';

const propTypes = {
    items: PropTypes.shape({
        heading: MicromagPropTypes.text,
    }),
    background: PropTypes.shape({
        image: MicromagPropTypes.image,
    }),
};

const defaultProps = {
    items: [
        { heading: { body: title() }, text: { body: description() } },
        { heading: { body: title() }, text: { body: description() } },
        { heading: { body: title() }, text: { body: description() } },
    ],
    background: {
        image: {
            url: 'https://picsum.photos/400/600',
        },
        color: '#ddd',
    },
};

const TimelineHeading = ({ items, background, ...otherProps }) => {
    return <TimelineCenteredComponent items={items} background={background} {...otherProps} />;
};

TimelineHeading.propTypes = propTypes;
TimelineHeading.defaultProps = defaultProps;

export default TimelineHeading;
