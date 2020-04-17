/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MicromagPropTypes } from '@micromag/core';

import TimelineDotsScreen from '../TimelineDotsScreen';

const propTypes = {
    title: MicromagPropTypes.text,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            subtitle: MicromagPropTypes.text,
            text: MicromagPropTypes.text,
            image: MicromagPropTypes.image,
        }),
    ),
    background: PropTypes.shape({
        image: MicromagPropTypes.image,
        color: MicromagPropTypes.color,
    }),
};

const defaultProps = {
    title: null,
    items: null,
    background: null,
};

const TimelineNormal = ({ items, title, ...otherProps }) => {
    return <TimelineDotsScreen title={title} items={items} {...otherProps} />;
};

TimelineNormal.propTypes = propTypes;
TimelineNormal.defaultProps = defaultProps;

export default TimelineNormal;
