import classNames from 'classnames';
import React from 'react';

import { useStackDirection } from './StackContext';

import styles from './styles/spacer.module.css';

interface SpacerProps {
    size?: number | null;
    minSize?: number | null;
    maxSize?: number | null;
    className?: string | null;
}

function Spacer({ size = null, minSize = null, maxSize = null, className = null }: SpacerProps) {
    const direction = useStackDirection();
    return (
        <div
            className={classNames([
                styles.container,
                className,
                {
                    [styles.hasSize]: size !== null,
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
