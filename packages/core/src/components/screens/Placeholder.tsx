/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';

import Screen from './Screen';
import ScreenSizer from './ScreenSizer';

import styles from '../../styles/screens/screen-placeholder.module.css';

interface ScreenPlaceholderProps {
    screen: Component;
    layout?: string;
    screenWidth?: number;
    screenHeight?: number;
    screenState?: string;
    withSize?: boolean;
    className?: string;
}

function ScreenPlaceholder({
    screen,
    layout = undefined,
    screenWidth = 100,
    screenHeight = 150,
    screenState = null,
    withSize = false,
    className = null,
    ...props
}: ScreenPlaceholderProps) {
    const screenElement = (
        <Screen
            screen={screen}
            renderContext="placeholder"
            screenState={screenState}
            layout={layout}
            className={classNames([
                styles.screen,
                {
                    [className]: !withSize,
                },
            ])}
            {...props}
        />
    );
    return withSize ? (
        <ScreenSizer className={className} screenWidth={screenWidth} screenHeight={screenHeight}>
            {screenElement}
        </ScreenSizer>
    ) : (
        screenElement
    );
}

export default React.memo(ScreenPlaceholder);
