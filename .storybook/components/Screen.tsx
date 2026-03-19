import classNames from 'classnames';
import React from 'react';

import { ScreenProvider } from '../../packages/core/src/contexts/ScreenContext';
import { ScreenSizeProvider } from '../../packages/core/src/contexts/ScreenSizeContext';
import { useScreenSizeFromElement } from '../../packages/core/src/hooks';
import { getDeviceScreens } from '../../packages/core/src/utils';
import { ApiProvider } from '../../packages/data/src/contexts/ApiContext';

import styles from './styles/screen.module.css';

interface ScreenProps {
    width?: number | string;
    height?: number | string;
    definition?: Record<string, unknown>;
    screen?: Record<string, unknown>;
    renderContext?: string;
    className?: string;
    screenClassName?: string;
    withBorder?: boolean;
    withScaling?: boolean;
    children: React.ReactNode;
}

function Screen({
    width = null,
    height = null,
    screen = null,
    definition = null,
    renderContext = 'view',
    className = null,
    screenClassName = null,
    withBorder = false,
    withScaling = false,
    children,
}) {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: getDeviceScreens(),
    });

    return (
        <div
            className={classNames([
                styles.container,
                className,
                {
                    [styles.withBorder]: withBorder,
                    [styles.withScaling]: withScaling,
                    [styles.withSize]: width !== null || height !== null,
                },
            ])}
            style={{
                width,
                height,
            }}
        >
            <div
                ref={refContainer}
                className={classNames([
                    styles.screen,
                    screenClassName,
                ])}
            >
                {screenSize.width > 0 && screenSize.height > 0 ? (
                    <ApiProvider baseUrl="http://localhost:58800">
                        <ScreenSizeProvider size={screenSize}>
                            <ScreenProvider
                                definition={definition}
                                data={screen}
                                renderContext={renderContext}
                            >
                                <div className={styles.screenContainer}>{children}</div>
                            </ScreenProvider>
                        </ScreenSizeProvider>
                    </ApiProvider>
                ) : null}
            </div>
        </div>
    );
}

export default Screen;
