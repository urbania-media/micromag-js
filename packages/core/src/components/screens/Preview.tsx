/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';


import Screen from './Screen';
import ScreenSizer from './ScreenSizer';

import styles from '../../styles/screens/preview.module.css';

interface ScreenPreviewProps {
    screen: Component;
    screenState?: string;
    width?: number;
    height?: number;
    screenWidth?: number;
    screenHeight?: number;
    className?: string;
    withSize?: boolean;
    hidden?: boolean;
}

const ScreenPreview = ({
    screen,
    screenState = null,
    width = undefined,
    height = undefined,
    screenWidth = undefined,
    screenHeight = undefined,
    className = null,
    withSize = false,
    fit,
    hidden = false,
    ...props
}) => {
    const screenElement = (
        <Screen
            screen={screen}
            renderContext="preview"
            screenState={screenState}
            width={!withSize ? width : undefined}
            height={!withSize ? height : undefined}
            className={classNames([
                styles.screen,
                {
                    [className]: !withSize,
                },
            ])}
            {...props}
        />
    );

    const element = !hidden ? screenElement : <div />;
    const screenWithSize = withSize ? (
        <ScreenSizer
            className={className}
            screenWidth={screenWidth}
            screenHeight={screenHeight}
            width={width}
            height={height}
            fit={fit}
        >
            {element}
        </ScreenSizer>
    ) : (
        element
    );

    return screenWithSize;
};

export default React.memo(ScreenPreview);
