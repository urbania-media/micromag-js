/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import * as MicromagPropTypes from '../../PropTypes';

import { getComponentFromName } from '../../../lib';
import TransitionComponents from './index';

const propTypes = {
    fullScreen: PropTypes.bool,
    playing: PropTypes.bool,
    delay: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    children: PropTypes.node,
};

const defaultProps = {
    fullScreen: false,
    playing: false,
    delay: 0,
    transitions: null,
    children: null,
};

const Transitions = ({ fullScreen, playing, delay, transitions, children }) => {
    const finalTransitions = { in: null, out: null };
    Object.keys(transitions || []).forEach((transitionKey) => {
        const currentTransition = transitions[transitionKey];
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
        TransitionOut !== null ? (
            <TransitionOut fullScreen={fullScreen} playing={playing} direction="out" {...transitionOutProps}>
                {children}
            </TransitionOut>
        ) : (
            children
        );
    return TransitionIn !== null ? (
        <TransitionIn
            fullScreen={fullScreen}
            playing={playing}
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
