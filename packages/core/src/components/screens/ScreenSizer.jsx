/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
// import { PropTypes as MicromagPropTypes } from '../../lib';
import { ScreenSizeProvider } from '../../contexts';
import { useResizeObserver } from '../../hooks';
import styles from '../../styles/screens/screen-sizer.module.scss';

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
        entry: { contentRect },
    } = useResizeObserver();
    const { width: calculatedWidth = 0, height: calculatedHeight = 0 } = contentRect || {};
    console.log(contentRect);

    const {
        width: frameWidth = null,
        height: frameHeight = null,
        transform: screenTransform = null,
    } = useMemo(() => {
        const containerWidth = width || calculatedWidth || null;
        const containerHeight = height || calculatedHeight || null;
        if (containerWidth === null && containerHeight === null) {
            return {};
        }
        const screenRatio = screenWidth / screenHeight;
        const finalContainerWidth = containerWidth || containerHeight * screenRatio;
        const finalContainerHeight = containerHeight || containerWidth / screenRatio;
        if (fit === null) {
            const screenScale = finalContainerWidth / screenWidth;
            return {
                width: finalContainerWidth,
                height: finalContainerHeight,
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
            transform: `scale(${screenScale}) translate(${x}px, ${y}px)`,
        };
    }, [screenWidth, screenHeight, width, height, fit, calculatedWidth, calculatedHeight]);

    const screenSize = useMemo(
        () => ({
            screen: 'mobile',
            screens: ['mobile'],
            width: screenWidth,
            height: screenHeight,
        }),
        [screenWidth, screenHeight],
    );

    const hasFrameSize = frameWidth !== null && frameHeight !== null;

    return (
        <div
            styles={classNames([
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
