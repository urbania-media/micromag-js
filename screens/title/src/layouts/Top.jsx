/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TitleScreen from '../TitleScreen';

const propTypes = {
    groups: PropTypes.arrayOf(PropTypes.array),
    box: MicromagPropTypes.boxElement,
};

const defaultProps = {
    groups: [['title', 'subtitle', 'description']],
    box: {
        direction: 'column',
        axisAlign: 'top',
    },
};

const TitleTop = ({ box, groups, ...otherProps }) => {
    return <TitleScreen box={box} groups={groups} {...otherProps} />;
};

TitleTop.propTypes = propTypes;
TitleTop.defaultProps = defaultProps;

export default TitleTop;
