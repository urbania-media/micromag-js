/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TimelineCenteredComponent from './TimelineCenteredComponent';

const propTypes = {
    items: PropTypes.arrayOf(MicromagPropTypes.textComponent),
};

const defaultProps = {
    items: null,
};

const Text = ({ items }) => {
    return <TimelineCenteredComponent items={items} />;
};

Text.propTypes = propTypes;
Text.defaultProps = defaultProps;

export default Text;
