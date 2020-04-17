/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TimelineCenteredScreen from '../TimelineCenteredScreen';
import { description } from '../../../../.storybook/data';

const propTypes = {
    items: PropTypes.shape({
        direction: MicromagPropTypes.flexDirection,
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
};

const TimelineImage = ({ items, ...otherProps}) => {
    return <TimelineCenteredScreen items={items} {...otherProps} />;
};

TimelineImage.propTypes = propTypes;
TimelineImage.defaultProps = defaultProps;

export default TimelineImage;
