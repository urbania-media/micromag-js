import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import { ReactNode, cloneElement } from 'react';

import { useDevicePixelRatio, useDimensionObserver } from '../../hooks';

import { ScreenSizeProvider } from '../../contexts';

import styles from '../../styles/screens/screen-sizer.module.css';

interface ScreenSizerProps {
    width?: number | null;
    height?: number | null;
    fit?: null | 'cover' | 'contain';
    screenWidth?: number;
    screenHeight?: number;
    className?: string | null;
    children: ReactNode;
}

function ScreenSizer({
    width = null,
    height = null,
    fit = null,
    screenWidth = 320,
    screenHeight = 480,
    className = null,
    children,
}: ScreenSizerProps) {
    const hasSize = width !== null || height !== null;
    //
    const {
        ref: refContainer,
        width: calculatedWidth = 0,
        height: calculatedHeight = 0,
    } = useDimensionObserver();

    let frameWidth = null;
    let frameHeight = null;
    let frameScale = null;
    let screenTransform = null;
    const containerWidth = width || calculatedWidth || null;
    const containerHeight = height || calculatedHeight || null;
    if (containerWidth !== null && containerHeight !== null) {
        const screenRatio = screenWidth / screenHeight;
        const finalContainerWidth = hasSize
            ? width || containerHeight * screenRatio
            : containerWidth;
        const finalContainerHeight = hasSize
            ? height || containerWidth / screenRatio
            : containerWidth / screenRatio;
        if (fit !== null) {
            const {
                width: screenScaledWidth,
                height: screenScaledHeight,
                scale: screenScale,
            } = getSizeWithinBounds(
                screenWidth,
                screenHeight,
                finalContainerWidth,
                finalContainerHeight,
                {
                    cover: fit === 'cover',
                },
            );

            const x = (finalContainerWidth - screenScaledWidth) / 2;
            const y = (finalContainerHeight - screenScaledHeight) / 2;

            frameWidth = finalContainerWidth;
            frameHeight = finalContainerHeight;
            frameScale = screenScale;
            screenTransform = `scale(${screenScale}) translate(${x}px, ${y}px)`;
        } else {
            const screenScale = finalContainerWidth / screenWidth;
            frameWidth = finalContainerWidth;
            frameHeight = finalContainerHeight;
            frameScale = screenScale;
            screenTransform = `scale(${screenScale})`;
        }
    }

    const devicePixelRatio = useDevicePixelRatio();
    const screenSize = {
        screen: 'mobile',
        screens: ['mobile'],
        width: screenWidth,
        height: screenHeight,
        resolution: frameScale !== null ? frameScale * devicePixelRatio : devicePixelRatio,
    };

    const hasFrameSize = frameWidth !== null && frameHeight !== null;

    return (
        <div
            className={classNames([styles.container, className])}
            ref={!hasSize ? refContainer : null}
        >
            {hasFrameSize ? (
                <div
                    className={styles.frame}
                    style={{
                        width: frameWidth,
                        height: frameHeight,
                    }}
                >
                    <div
                        className={styles.screen}
                        style={{
                            width: screenWidth,
                            height: screenHeight,
                            transform: screenTransform,
                        }}
                    >
                        <ScreenSizeProvider size={screenSize}>
                            {cloneElement(children, {
                                width: screenWidth,
                                height: screenHeight,
                            })}
                        </ScreenSizeProvider>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default ScreenSizer;
