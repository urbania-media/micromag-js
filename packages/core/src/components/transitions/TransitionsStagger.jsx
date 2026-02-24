import React from 'react';
import PropTypes from 'prop-types';

import { PropTypes as MicromagPropTypes } from '../../lib';
import Transitions from './Transitions';

const propTypes = {
    transitions: MicromagPropTypes.transitions,
    stagger: PropTypes.number,
    playing: PropTypes.bool,
    disabled: PropTypes.bool,
    delay: PropTypes.number,
    fullscreen: PropTypes.bool,
    children: PropTypes.node,
};

const TransitionsStagger = ({
    transitions = null,
    stagger = 0,
    playing = false,
    disabled = false,
    delay = 0,
    fullscreen = false,
    children = null,
}) => {
    let validIndex = 0;
    const elements = React.Children.map(children, (child) => {
        if (!child) {
            return null;
        }

        const { type = null } = child;
        const { withoutTransitionsWrapper = false } = type || {};

        if (disabled || withoutTransitionsWrapper) {
            return child;
        }

        const el = (
            <Transitions
                transitions={transitions}
                delay={delay + validIndex * stagger}
                playing={playing}
                fullscreen={fullscreen}
            >
                {child}
            </Transitions>
        );
        validIndex += 1;
        return el;
    });

    return elements;
};
TransitionsStagger.propTypes = propTypes;

export default TransitionsStagger;
