/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import QuoteSplitScreen from '../QuoteSplitScreen';

const propTypes = {
    box: PropTypes.shape({
        direction: MicromagPropTypes.flexDirection,
    }),
};

const defaultProps = {
    box: {
        direction: 'column',
        axisAlign: 'center',
    },
};

const QuoteSplit = ({ box, ...otherProps }) => {
    return <QuoteSplitScreen box={box} {...otherProps} />;
};

QuoteSplit.propTypes = propTypes;
QuoteSplit.defaultProps = defaultProps;

export default QuoteSplit;
