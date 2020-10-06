/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import * as MicromagPropTypes from '../../PropTypes';

import { getComponentFromName } from '../../../lib';
import TransitionComponents from './index';

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

const Transitions = ({ playing, delay, transitions, children }) => {
    
    const finalTransitions = { in: null, out: null };
    Object.keys(transitions).forEach((transitionKey) => {
        const currentTransition = transitions[transitionKey];
        finalTransitions[transitionKey] = typeof currentTransition === 'string' ? { name: currentTransition } : currentTransition;
    });

    const { in: transitionIn = null, out: transitionOut = null } = finalTransitions;
    const finalTransitionIn = transitionIn !== null ? transitionIn : transitionOut;
    const finalTransitionOut = transitionOut !== null ? transitionOut : transitionIn;
    const sameTransitionInOut = finalTransitionIn.name === finalTransitionOut.name;

    const TransitionIn = finalTransitionIn !== null ? getComponentFromName(finalTransitionIn.name, TransitionComponents, null) : null;
    const TransitionOut = finalTransitionOut !== null && !sameTransitionInOut ? getComponentFromName(finalTransitionOut.name, TransitionComponents, null) : null;
    
    const transitionInProps = finalTransitionIn !== null ? {...finalTransitionIn, name: undefined, delay } : null;
    const transitionOutProps = finalTransitionOut !== null ? {...finalTransitionOut, name: undefined, delay } : null;

    const renderTransitionOut = 
        TransitionOut !== null ?
            <TransitionOut playing={playing} direction="out" {...transitionOutProps}>
                { children }
            </TransitionOut>
        : children
    ;        

    return (
        <>
            { TransitionIn !== null ? (
                <TransitionIn playing={playing} direction={sameTransitionInOut ? 'both' : 'in'} {...transitionInProps}>
                    { renderTransitionOut }
                </TransitionIn>
            ) : renderTransitionOut }
        </>
    );
};

Transitions.propTypes = propTypes;
Transitions.defaultProps = defaultProps;

export default Transitions;