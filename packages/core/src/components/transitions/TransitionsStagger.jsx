import React, { useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import * as MicromagPropTypes from '../../PropTypes';

import Transitions from './Transitions';

const propTypes = {
    transitions: MicromagPropTypes.transitions,
    stagger: PropTypes.number,
    playing: PropTypes.bool,
    delay: PropTypes.number,
    children: PropTypes.node,
};

const defaultProps = {
    transitions: null,
    stagger: 0,
    playing: false,
    delay: 0,
    children: null,
};

const TransitionsStagger = ({ transitions, stagger, playing, delay, children }) =>
    React.Children.map(children, (child, childIndex) => (
        <Transitions
            transitions={transitions}
            delay={delay + childIndex * stagger}
            playing={playing}
        >
            {child}
        </Transitions>
    ));

TransitionsStagger.propTypes = propTypes;
TransitionsStagger.defaultProps = defaultProps;

export default TransitionsStagger;
