/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

import { useScreenSize } from '../../contexts';
import { PropTypes as MicromagPropTypes } from '../../lib';
import { getComponentFromName } from '../../utils';
import TransitionComponents from './index';

const propTypes = {
    fullscreen: PropTypes.bool,
    playing: PropTypes.bool,
    delay: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    disabled: PropTypes.bool,
    children: PropTypes.node,
};

const defaultProps = {
    fullscreen: false,
    playing: false,
    delay: 0,
    transitions: null,
    disabled: false,
    children: null,
};

const Transitions = ({ fullscreen, playing, delay, transitions, disabled, children }) => {
    const { landscape = false } = useScreenSize();
    const finalPlaying = playing || landscape;

    const finalTransitions = { in: null, out: null };

    const defaultTransitions = { in: 'fade', out: 'fade' };
    const transitionsObject = transitions !== null ? transitions : defaultTransitions;
    
    Object.keys(transitions || []).forEach((transitionKey) => {
        const currentTransition = transitionsObject[transitionKey];
        finalTransitions[transitionKey] =
            typeof currentTransition === 'string' ? { name: currentTransition } : currentTransition;
    });

    const { in: transitionIn = null, out: transitionOut = null } = finalTransitions;
    const finalTransitionIn = transitionIn !== null ? transitionIn : transitionOut;
    const finalTransitionOut = transitionOut !== null ? transitionOut : transitionIn;
    const { name: transitionInName = null } = finalTransitionIn || {};
    const { name: transitionOutName = null } = finalTransitionOut || {};
    const sameTransitionInOut = transitionInName === transitionOutName;

    const TransitionIn =
        finalTransitionIn !== null
            ? getComponentFromName(transitionInName, TransitionComponents, null)
            : null;
    const TransitionOut =
        finalTransitionOut !== null && !sameTransitionInOut
            ? getComponentFromName(transitionOutName, TransitionComponents, null)
            : null;

    const transitionInProps =
        finalTransitionIn !== null ? { ...finalTransitionIn, name: undefined, delay } : null;
    const transitionOutProps =
        finalTransitionOut !== null ? { ...finalTransitionOut, name: undefined, delay } : null;

    const renderTransitionOut =
        TransitionOut !== null && !disabled ? (
            <TransitionOut
                fullscreen={fullscreen}
                playing={finalPlaying}
                direction="out"
                {...transitionOutProps}
            >
                {children}
            </TransitionOut>
        ) : (
            children
        );
    return TransitionIn !== null && !disabled ? (
        <TransitionIn
            fullscreen={fullscreen}
            playing={finalPlaying}
            direction={!sameTransitionInOut ? 'in' : null}
            {...transitionInProps}
        >
            {renderTransitionOut}
        </TransitionIn>
    ) : (
        renderTransitionOut
    );
};

Transitions.propTypes = propTypes;
Transitions.defaultProps = defaultProps;

export default Transitions;
