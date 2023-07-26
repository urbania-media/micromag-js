/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';

import { useDimensionObserver } from '../../hooks';

// import { PropTypes as MicromagPropTypes } from '../../lib';
import { ScreenSizeProvider } from '../../contexts';

import styles from '../../styles/screens/screen-sizer.module.scss';

const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fit: PropTypes.oneOf([null, 'cover', 'contain']),
    screenWidth: PropTypes.number,
    screenHeight: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

const defaultProps = {
    width: null,
    height: null,
    fit: null,
    screenWidth: 320,
    screenHeight: 480,
    className: null,
};

const ScreenSizer = ({ width, height, fit, screenWidth, screenHeight, className, children }) => {
    const hasSize = width !== null || height !== null;

    const {
        ref: refContainer,
        width: calculatedWidth = 0,
        height: calculatedHeight = 0,
    } = useDimensionObserver();

    const {
        width: frameWidth = null,
        height: frameHeight = null,
        scale: frameScale = null,
        transform: screenTransform = null,
    } = useMemo(() => {
        const containerWidth = width || calculatedWidth || null;
        const containerHeight = height || calculatedHeight || null;
        if (containerWidth === null && containerHeight === null) {
            return {};
        }
        const screenRatio = screenWidth / screenHeight;
        const finalContainerWidth = hasSize
            ? width || containerHeight * screenRatio
            : containerWidth;
        const finalContainerHeight = hasSize
            ? height || containerWidth / screenRatio
            : containerWidth / screenRatio;
        if (fit === null) {
            const screenScale = finalContainerWidth / screenWidth;
            return {
                width: finalContainerWidth,
                height: finalContainerHeight,
                scale: screenScale,
                transform: `scale(${screenScale})`,
            };
        }

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

        return {
            width: finalContainerWidth,
            height: finalContainerHeight,
            scale: screenScale,
            transform: `scale(${screenScale}) translate(${x}px, ${y}px)`,
        };
    }, [screenWidth, screenHeight, width, height, fit, calculatedWidth, calculatedHeight, hasSize]);

    const screenSize = useMemo(
        () => ({
            screen: 'mobile',
            screens: ['mobile'],
            width: screenWidth,
            height: screenHeight,
            resolution: frameScale !== null ? frameScale * devicePixelRatio : devicePixelRatio,
        }),
        [screenWidth, screenHeight, frameScale],
    );

    const hasFrameSize = frameWidth !== null && frameHeight !== null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
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
                            {React.cloneElement(children, {
                                width: screenWidth,
                                height: screenHeight,
                            })}
                        </ScreenSizeProvider>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

ScreenSizer.propTypes = propTypes;
ScreenSizer.defaultProps = defaultProps;

export default ScreenSizer;
