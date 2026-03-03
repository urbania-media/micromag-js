import React from 'react';

import Transitions from './Transitions';

interface TransitionsStaggerProps {
    transitions?: Transitions;
    stagger?: number;
    playing?: boolean;
    disabled?: boolean;
    delay?: number;
    fullscreen?: boolean;
    children?: React.ReactNode;
}

function TransitionsStagger({
    transitions = null,
    stagger = 0,
    playing = false,
    disabled = false,
    delay = 0,
    fullscreen = false,
    children = null,
}: TransitionsStaggerProps) {
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
}

export default TransitionsStagger;
