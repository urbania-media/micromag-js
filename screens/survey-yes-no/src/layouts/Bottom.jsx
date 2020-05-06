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
        axisAlign: 'bottom',
    },
};

const SurveyYesNoBottom = ({ box, ...otherProps }) => {
    return <SurveyYesNoScreen box={box} {...otherProps} />;
};

SurveyYesNoBottom.propTypes = propTypes;
SurveyYesNoBottom.defaultProps = defaultProps;

export default SurveyYesNoBottom;
