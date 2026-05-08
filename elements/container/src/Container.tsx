import classNames from 'classnames';
import React, { ForwardedRef } from 'react';

import styles from './styles.module.css';

interface ContainerProps {
    ref?: ForwardedRef<HTMLDivElement> | null;
    width: number;
    height: number;
    style?: Record<string, unknown> | null;
    className?: string | null;
    children?: React.ReactNode | null;
}

function Container({
    ref = null,
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
        <div ref={ref} className={classNames([styles.container, className])} style={containerStyle}>
            {children}
        </div>
    );
}

export default Container;
