/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import TitleScreen from '../TitleScreen';

const propTypes = {
    groups: PropTypes.arrayOf(PropTypes.array),
    box: MicromagPropTypes.boxComponent,
};

const defaultProps = {
    groups: [['title', 'subtitle', 'description']],
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const TitleCenter = ({ box, groups, ...otherProps }) => {
    return <TitleScreen box={box} groups={groups} {...otherProps} />;
};

TitleCenter.propTypes = propTypes;
TitleCenter.defaultProps = defaultProps;

export default TitleCenter;
