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
    groups: [['subtitle', 'title'], ['description']],
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const TitleTopSubtitle = ({ box, groups, ...otherProps }) => {
    return <TitleScreen box={box} groups={groups} {...otherProps} />;
};

TitleTopSubtitle.propTypes = propTypes;
TitleTopSubtitle.defaultProps = defaultProps;

export default TitleTopSubtitle;
