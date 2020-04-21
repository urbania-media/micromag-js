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
    groups: [['subtitle'], ['title'], ['description']],
    box: {
        direction: 'column',
        axisAlign: 'center',
        reverse: true,
    },
};

const TitleTopSubtitleReverse = ({ box, groups, ...otherProps }) => {
    return <TitleScreen box={box} groups={groups} {...otherProps} />;
};

TitleTopSubtitleReverse.propTypes = propTypes;
TitleTopSubtitleReverse.defaultProps = defaultProps;

export default TitleTopSubtitleReverse;
