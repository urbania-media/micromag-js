/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { getComponentFromName } from '../../utils';

import { useScreenSize } from '../../contexts';
import TransitionComponents from './index';

interface TransitionsProps {
    fullscreen?: boolean;
    playing?: boolean;
    delay?: number;
    transitions?: Transitions;
    onComplete?: (...args: unknown[]) => void;
    disabled?: boolean;
    children?: React.ReactNode;
}

function Transitions({
    fullscreen = false,
    playing = false,
    delay = 0,
    transitions = null,
    onComplete = null,
    disabled = false,
    children = null,
}: TransitionsProps) {
    const { landscape = true } = useScreenSize();

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

export default Transitions;
