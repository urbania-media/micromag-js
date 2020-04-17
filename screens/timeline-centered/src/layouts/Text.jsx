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
        { text: { body: description() } },
        { text: { body: description() } },
        { text: { body: description() } },
    ],
};

const TimelineText = ({ items, ...otherProps }) => {
    return <TimelineCenteredScreen items={items} {...otherProps} />;
};

TimelineText.propTypes = propTypes;
TimelineText.defaultProps = defaultProps;

export default TimelineText;
