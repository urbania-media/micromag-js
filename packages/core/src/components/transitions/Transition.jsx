/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import * as MicromagPropTypes from '../../PropTypes';

import Transitions from './index';
import { getComponentFromName } from '../../../lib';

const propTypes = {
    playing: PropTypes.bool,
    delay: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    children: PropTypes.node,
};

const defaultProps = {
    playing: false,
    delay: 0,
    transitions: null,
    children: null,
};

const Transition = ({ playing, delay, transitions, children }) => {
    
    const finalTransitions = { in: null, out: null };
    Object.keys(transitions).forEach((transitionKey) => {
        const currentTransition = transitions[transitionKey];
        finalTransitions[transitionKey] = typeof currentTransition === 'string' ? { name: currentTransition } : currentTransition;
    });

    const { in: transitionIn = null, out: transitionOut = null } = finalTransitions;
    const finalTransitionIn = transitionIn !== null ? transitionIn : transitionOut;
    const finalTransitionOut = transitionOut !== null ? transitionOut : transitionIn;
    const sameTransitionInOut = finalTransitionIn.name === finalTransitionOut.name;

    const TransitionIn = finalTransitionIn !== null ? getComponentFromName(finalTransitionIn.name, Transitions, null) : null;
    const TransitionOut = finalTransitionOut !== null && !sameTransitionInOut ? getComponentFromName(finalTransitionOut.name, Transitions, null) : null;
    
    const transitionInProps = finalTransitionIn !== null ? {...finalTransitionIn, name: undefined, delay } : null;
    const transitionOutProps = finalTransitionOut !== null ? {...finalTransitionOut, name: undefined, delay } : null;

    return (
        <>
            { TransitionIn !== null ? (
                <TransitionIn playing={playing} direction={sameTransitionInOut ? 'both' : 'in'} {...transitionInProps}>
                    { TransitionOut !== null ?
                        <TransitionOut playing={playing} direction="out" {...transitionOutProps}>
                            { children }
                        </TransitionOut>
                    : children }
                </TransitionIn>
            ) : null }
            { TransitionIn === null ? 
                <>
                    { TransitionOut !== null ? 
                        <TransitionOut playing={playing} direction="out" {...transitionOutProps}>{ children }</TransitionOut>
                    : children }
                </>
            : null }
        </>
    );
};

Transition.propTypes = propTypes;
Transition.defaultProps = defaultProps;

export default Transition;