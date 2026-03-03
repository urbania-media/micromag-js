/* eslint-disable react/forbid-prop-types */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import styles from './styles.module.css';

interface ContainerProps {
    containerRef?: (...args: unknown[]) => void | { current?: unknown };
    width: number;
    height: number;
    style?: Record<string, unknown>;
    className?: string;
    children?: React.ReactNode;
}

function Container({
    containerRef = null,
    width,
    height,
    style = null,
    className = null,
    children = null,
}: ContainerProps) {
    const hasSize = width > 0 && height > 0;
    const containerStyle = hasSize
        ? {
              width,
              height,
              ...style,
          }
        : style;

    return (
        <div
            ref={containerRef}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={containerStyle}
        >
            {children}
        </div>
    );
}

export default React.forwardRef((props, ref) => <Container containerRef={ref} {...props} />);
