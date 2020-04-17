/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { title, description } from '../../../../.storybook/data';

import TimelineCenteredScreen from '../TimelineCenteredScreen';

const propTypes = {
    items: PropTypes.shape({
        heading: MicromagPropTypes.text,
    }),
};

const defaultProps = {
    items: [
        { heading: { body: title() }, text: { body: description() } },
        { heading: { body: title() }, text: { body: description() } },
        { heading: { body: title() }, text: { body: description() } },
    ],

};

const TimelineHeading = ({ items, ...otherProps }) => {
    return <TimelineCenteredScreen items={items} {...otherProps} />;
};

TimelineHeading.propTypes = propTypes;
TimelineHeading.defaultProps = defaultProps;

export default TimelineHeading;
