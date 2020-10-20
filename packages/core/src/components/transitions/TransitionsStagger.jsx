import React from 'react';
import PropTypes from 'prop-types';
import * as MicromagPropTypes from '../../PropTypes';

import Transitions from './Transitions';

const propTypes = {
    transitions: MicromagPropTypes.transitions,
    stagger: PropTypes.number,
    playing: PropTypes.bool,
    disabled: PropTypes.bool,
    delay: PropTypes.number,
    children: PropTypes.node,
};

const defaultProps = {
    transitions: null,
    stagger: 0,
    playing: false,
    disabled: false,
    delay: 0,
    children: null,
};

const TransitionsStagger = ({ transitions, stagger, playing, disabled, delay, children }) => {
    let validIndex = 0;
    const elements = React.Children.map(children, (child) => {

        if (!child) {
            return null;
        }

        const { type = null } = child;
        const { name = null } = type || {};
        
        if (disabled || name === 'Spacer') {
            return child;
        }

        const el = (
            <Transitions
                transitions={transitions}
                delay={delay + validIndex * stagger}
                playing={playing}
            >
                {child}
            </Transitions>
        );
        validIndex += 1;
        return el
    });

    return elements;
}
TransitionsStagger.propTypes = propTypes;
TransitionsStagger.defaultProps = defaultProps;

export default TransitionsStagger;
