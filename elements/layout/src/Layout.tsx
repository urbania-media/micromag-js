import classNames from 'classnames';
import React from 'react';

import { StackProvider } from '@micromag/element-stack';

import styles from './styles.module.css';

interface LayoutProps {
    width?: number;
    height?: number;
    horizontalAlign?: 'left' | 'center' | 'right';
    verticalAlign?: 'top' | 'middle' | 'bottom';
    distribution?: 'between' | 'around' | null;
    fullscreen?: boolean;
    className?: string;
    children?: React.ReactNode;
    style?: Record<string, unknown>;
}

function Layout({
    width = null,
    height = null,
    horizontalAlign = 'left',
    verticalAlign = 'top',
    distribution = null,
    fullscreen = false,
    className = null,
    children = null,
    style = null,
}) {
    let justifyContent = null;
    if (distribution !== null) {
        justifyContent = `space-${distribution}`;
    } else if (verticalAlign === 'middle') {
        justifyContent = 'center';
    } else if (verticalAlign === 'bottom') {
        justifyContent = 'flex-end';
    }

    let alignItems = null;
    if (horizontalAlign === 'center') {
        alignItems = 'center';
    } else if (horizontalAlign === 'right') {
        alignItems = 'flex-end';
    }

    const finalStyle = {
        width,
        height,
        justifyContent,
        alignItems,
        ...style,
    };

    return (
        <StackProvider direction="vertical">
            <div
                className={classNames([
                    styles.container,
                    {
                        [styles.fullscreen]: fullscreen,
                        [className]: className !== null,
                    },
                ])}
                style={finalStyle}
            >
                {children}
            </div>
        </StackProvider>
    );
}

export default Layout;
