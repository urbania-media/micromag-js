import React from 'react';
import classNames from 'classnames';
import { getDeviceScreens } from '../../packages/core/src/utils';
import { useScreenSizeFromElement } from '../../packages/core/src/hooks';
import { ScreenSizeProvider } from '../../packages/core/src/contexts';

import styles from './styles/screen.module.scss';

const ViewerScreen = ({
    width = null,
    height = null,
    className = null,
    screenClassName = null,
    withBorder = false,
    children,
}) => {
    const { ref: refContainer, screenSize } = useScreenSizeFromElement({
        width,
        height,
        screens: getDeviceScreens(),
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.withBorder]: withBorder,
                    [styles.withSize]: width !== null || height !== null,
                    [className]: className !== null,
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
                    {
                        [screenClassName]: screenClassName !== null,
                    },
                ])}
            >
                <ScreenSizeProvider size={screenSize}>{children}</ScreenSizeProvider>
            </div>
        </div>
    );
};

export default ViewerScreen;
