/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import SurveyYesNoScreen from '../SurveyYesNoScreen';

const propTypes = {
    box: PropTypes.shape({
        direction: MicromagPropTypes.flexDirection,
    }),
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'top',
    },
};

const SurveyYesNoTop = ({ box, ...otherProps }) => {
    return <SurveyYesNoScreen box={box} {...otherProps} />;
};

SurveyYesNoTop.propTypes = propTypes;
SurveyYesNoTop.defaultProps = defaultProps;

export default SurveyYesNoTop;
