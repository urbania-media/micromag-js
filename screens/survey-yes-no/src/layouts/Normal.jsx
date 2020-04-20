/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
// import PropTypes from 'prop-types';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';

import SurveyYesNoScreen from '../SurveyYesNoScreen';

const propTypes = {
    //
};

const defaultProps = {
    //
};

const SurveyMain = props => {
    return <SurveyYesNoScreen {...props} />;
};

SurveyMain.propTypes = propTypes;
SurveyMain.defaultProps = defaultProps;

export default SurveyMain;
