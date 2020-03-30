/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import QuoteComponent from './QuoteComponent';

const propTypes = {
    grid: PropTypes.shape({
        layout: MicromagPropTypes.layout,
    }),
    position: PropTypes.number,
};

const defaultProps = {
    grid: {
        layout: [
            {
                rows: 1,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1],
            },
            {
                rows: 1,
                columns: [1],
            },
        ],
    },
    position: 3,
};

const QuoteTop = ({ grid, position, ...otherProps }) => {
    return <QuoteComponent grid={grid} position={position} {...otherProps} />;
};

QuoteTop.propTypes = propTypes;
QuoteTop.defaultProps = defaultProps;

export default QuoteTop;
