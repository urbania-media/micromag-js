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
        { text: { body: description() } },
        { text: { body: description() } },
        { text: { body: description() } },
    ],
    background: {
        image: {
            url: 'https://picsum.photos/400/600',
        },
        color: '#ddd',
    },
};

const TimelineText = ({ items, background, ...otherProps }) => {
    return <TimelineCenteredComponent items={items} background={background} {...otherProps} />;
};

TimelineText.propTypes = propTypes;
TimelineText.defaultProps = defaultProps;

export default TimelineText;
