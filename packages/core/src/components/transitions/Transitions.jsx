/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';

import { PropTypes as MicromagPropTypes } from '../../lib';
import { getComponentFromName } from '../../utils';

import { useScreenSize } from '../../contexts';
import TransitionComponents from './index';

const propTypes = {
    fullscreen: PropTypes.bool,
    playing: PropTypes.bool,
    delay: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    onComplete: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.node,
};

const defaultProps = {
    fullscreen: false,
    playing: false,
    delay: 0,
    transitions: null,
    onComplete: null,
    disabled: false,
    children: null,
};

function Transitions({ fullscreen, playing, delay, transitions, onComplete, disabled, children }) {
    const { landscape = true } = useScreenSize();
    // console.log({ landscape });

    const finalPlaying = playing || landscape;
    const finalTransitions = { in: null, out: null };

    const defaultTransitions = { in: 'fade', out: 'fade' };
    const transitionsObject = transitions !== null ? transitions : defaultTransitions;

    Object.keys(transitionsObject).forEach((transitionKey) => {
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
        finalTransitionIn !== null
            ? { ...finalTransitionIn, name: undefined, delay, onComplete }
            : null;
    const transitionOutProps =
        finalTransitionOut !== null
            ? { ...finalTransitionOut, name: undefined, delay, onComplete }
            : null;

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
}

Transitions.propTypes = propTypes;
Transitions.defaultProps = defaultProps;

export default Transitions;
