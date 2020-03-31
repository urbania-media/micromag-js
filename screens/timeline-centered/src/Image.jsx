/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TimelineCenteredComponent from './TimelineCenteredComponent';

const propTypes = {
    // @TODO update propType
    items: PropTypes.arrayOf(MicromagPropTypes.textComponent),
};

const defaultProps = {
    items: null,
};

const Image = ({ items }) => {
    return <TimelineCenteredComponent items={items} />;
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
