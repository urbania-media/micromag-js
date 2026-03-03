import classNames from 'classnames';
import React from 'react';

import { useStackDirection } from './StackContext';

import styles from './styles/spacer.module.css';

interface SpacerProps {
    size?: number;
    minSize?: number;
    maxSize?: number;
    className?: string;
}

function Spacer({ size = null, minSize = null, maxSize = null, className = null }) {
    const direction = useStackDirection();
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.hasSize]: size !== null,
                    [className]: className !== null,
                },
            ])}
            style={{
                width: direction === 'horizontal' ? size : null,
                minWidth: direction === 'horizontal' ? minSize : null,
                maxWidth: direction === 'horizontal' ? maxSize : null,
                height: direction === 'vertical' ? size : null,
                minHeight: direction === 'vertical' ? minSize : null,
                maxHeight: direction === 'vertical' ? maxSize : null,
            }}
        />
    );
}

Spacer.withoutTransitionsWrapper = true;

export default Spacer;
