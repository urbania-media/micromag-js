/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TimelineDotsScreen from '../TimelineDotsScreen';
import { description, title } from '../../../../.storybook/data';

const propTypes = {
    title: MicromagPropTypes.textComponent,
    items: PropTypes.arrayOf(MicromagPropTypes.textComponent),
    background: PropTypes.shape({
        image: MicromagPropTypes.image,
    }),
};

const defaultProps = {
    title: { body: title() },
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

const TimelineText = ({ title: titleValue, items, background, ...otherProps }) => {
    return (
        <TimelineDotsScreen
            title={titleValue}
            items={items}
            background={background}
            {...otherProps}
        />
    );
};

TimelineText.propTypes = propTypes;
TimelineText.defaultProps = defaultProps;

export default TimelineText;
