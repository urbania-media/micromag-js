/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TimelineCenteredComponent from '../TimelineCenteredComponent';
import { description } from '../../../../.storybook/data';

const propTypes = {
    items: PropTypes.shape({
        direction: MicromagPropTypes.flexDirection,
    }),
    background: PropTypes.shape({
        image: MicromagPropTypes.image,
    }),
};

const defaultProps = {
    items: [
        {
            image: {
                url: 'https://picsum.photos/400/300',
            },
            text: { body: description() },
        },
        {
            image: {
                url: 'https://picsum.photos/400/400',
            },
            text: { body: description() },
        },
        {
            image: {
                url: 'https://picsum.photos/400/500',
            },
            text: { body: description() },
        },
    ],
    background: {
        image: {
            url: 'https://picsum.photos/400/600',
        },
        color: '#ddd',
    },
};

const TimelineImage = ({ items, background, ...otherProps}) => {
    return <TimelineCenteredComponent items={items} background={background} {...otherProps} />;
};

TimelineImage.propTypes = propTypes;
TimelineImage.defaultProps = defaultProps;

export default TimelineImage;
