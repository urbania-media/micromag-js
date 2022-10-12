/* eslint-disable react/jsx-props-no-spreading */
import { animated } from '@react-spring/web';
import camelCase from 'camelcase';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    PlaceholderTitle,
    PlaceholderText,
    PlaceholderImage,
    PlaceholderButton,
    ScreenElement,
} from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useScreenState,
    useViewerContext,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { useDragProgress, useTrackScreenEvent } from '@micromag/core/hooks';
import { getStyleFromText, getStyleFromBox, getStyleFromColor } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Keypad from '@micromag/element-keypad';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './keypad.module.scss';

const placeholderPopupBoxStyles = {
    padding: {
        left: 30,
        top: 30,
        right: 30,
        bottom: 30,
    },
};

// const stopDragEventsPropagation = {
//     onTouchMove: (e) => e.stopPropagation(),
//     onTouchStart: (e) => e.stopPropagation(),
//     onTouchEnd: (e) => e.stopPropagation(),
//     onPointerMove: (e) => e.stopPropagation(),
//     onPointerUp: (e) => e.stopPropagation(),
//     onPointerDown: (e) => e.stopPropagation(),
// };

// @todo is this still good? if yes, maybe extract to util?
// const mouseBlocker = {
//     ...stopDragEventsPropagation,
//     onClick: (e) => e.stopPropagation(),
//     style: {
//         position: 'fixed',
//         zIndex: '1000',
//         top: 0,
//         right: 0,
//         bottom: 0,
//         left: 0,
//         cursor: 'default',
//     },
// };

const propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            heading: MicromagPropTypes.headingElement,
            description: MicromagPropTypes.textElement,
            visual: MicromagPropTypes.visualElement,
            boxStyle: MicromagPropTypes.boxStyle,
        }),
    ),
    layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    keypadLayout: PropTypes.shape({
        columnAlign: PropTypes.oneOf(['left', 'right', 'middle']),
        columns: PropTypes.number,
        spacing: PropTypes.number,
        withSquareItems: PropTypes.bool,
        buttonStyles: PropTypes.shape({
            buttonLayout: PropTypes.string,
            textStyle: MicromagPropTypes.textStyle,
            boxStyle: MicromagPropTypes.boxStyle,
        }),
    }),
    // buttonStyles: PropTypes.shape({
    //     buttonLayout: PropTypes.string,
    //     textStyle: MicromagPropTypes.textStyle,
    //     boxStyle: MicromagPropTypes.boxStyle,
    // }),
    popupStyles: PropTypes.shape({
        popupLayout: PropTypes.oneOf(['content-top', 'content-split', 'content-bottom']),
        textStyle: MicromagPropTypes.textStyle,
        boxStyle: MicromagPropTypes.boxStyle,
    }),
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    items: null,
    layout: null,
    keypadLayout: null,
    // buttonStyles: null,
    popupStyles: null,
    background: null,
    current: true,
    active: true,
    className: null,
};

const KeypadScreen = ({
    items,
    layout,
    keypadLayout,
    // buttonStyles,
    popupStyles,
    background,
    current,
    active,
    className,
}) => {
    // const intl = useIntl();
    const trackScreenEvent = useTrackScreenEvent('keypad');
    // const { enableInteraction, disableInteraction } = useViewerInteraction();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = !isPlaceholder && (current || active);

    const {
        columnAlign = null,
        columns = null,
        spacing = null,
        withSquareItems = false,
        buttonStyles = null,
    } = keypadLayout || {};
    const { buttonLayout = null, textStyle = null, boxStyle = null } = buttonStyles || {};
    const {
        layout: popupLayout = null,
        backdrop: popupBackdrop = null,
        textStyle: popupTextStyle = null,
        boxStyle: popupBoxStyle = null,
    } = popupStyles || {};
    const popupLayoutClassName = useMemo(
        () => (popupLayout !== null ? camelCase(popupLayout) : ''),
        [popupLayout],
    );

    const [showPopup, setShowPopup] = useState(false);
    const [popup, setPopup] = useState(null);

    const onItemClick = useCallback(
        (e, item) => {
            e.stopPropagation();
            setPopup(item);
            setShowPopup(1);
            trackScreenEvent('click_item', item);
        },
        [setPopup, trackScreenEvent],
    );

    const onCloseModal = useCallback(() => {
        setShowPopup(0);
        // trackScreenEvent('UrbaniaHoroscope', 'close_sign_modal');
        // }, [setShowPopup, trackScreenEvent]);
    }, [setShowPopup]);

    const computePopupProgress = useCallback(
        ({ active: dragActive, movement: [, my], velocity: [, vy] }) => {
            const damper = 0.5;
            const p = Math.max(0, my) / window.innerHeight;
            const progress = p * damper;
            const reachedThreshold = vy > 0.3 || Math.abs(p) > 0.3;

            if (!dragActive) {
                if (reachedThreshold) {
                    onCloseModal();
                }
                return reachedThreshold ? 0 : 1;
            }
            return 1 - progress;
        },
        [onCloseModal],
    );

    const { bind: bindPopupDrag, progress: popupSpring } = useDragProgress({
        disabled: !isView,
        progress: showPopup ? 1 : 0,
        computeProgress: computePopupProgress,
        springParams: { config: { tension: 300, friction: 30 } },
    });

    const finalItems = useMemo(
        () => (items === null || items.length === 0 ? [1, 2, 3, 4, 5, 6, 7] : items),
        [items],
    );
    const gridItems = finalItems.map((item) => {
        const {
            label = null,
            visual = null,
            textStyle: customTextStyle = null,
            boxStyle: customBoxStyle = null,
            heading = null,
            content = null,
            largeVisual = null,
        } = item || {};
        const { url: visualUrl = null } = visual || {};
        const key = label || visualUrl;
        const isEmpty = label === null && visual === null;
        const isPopupEmpty = heading === null && content === null && largeVisual === null;
        return (
            <div key={key} className={styles.item}>
                <Button
                    className={classNames([
                        styles.button,
                        {
                            [styles.layoutLabelBottom]: buttonLayout === 'label-bottom',
                            [styles.layoutLabelTop]: buttonLayout === 'label-top',
                            [styles.layoutNoLabel]: buttonLayout === 'no-label',
                            [styles.layoutLabelOver]: buttonLayout === 'label-over',
                            [styles.isEmpty]: isEmpty,
                            [styles.isPopupEmpty]: isPopupEmpty,
                        },
                    ])}
                    style={{
                        ...getStyleFromBox(boxStyle),
                        ...getStyleFromText(textStyle),
                        ...getStyleFromBox(customBoxStyle),
                        ...getStyleFromText(customTextStyle),
                    }}
                    onClick={
                        !isPopupEmpty ? (e) => onItemClick(e, item) : (e) => e.preventDefault()
                    }
                >
                    {!isEmpty ? (
                        <ScreenElement>
                            {visual !== null ? (
                                <Visual
                                    className={styles.buttonVisual}
                                    imageClassName={styles.thumbnail}
                                    media={visual}
                                    width="auto"
                                />
                            ) : null}
                            {label !== null ? (
                                <div className={styles.buttonLabel}>{label}</div>
                            ) : null}
                        </ScreenElement>
                    ) : null}

                    {isEmpty && !isPlaceholder ? (
                        <ScreenElement>
                            <PlaceholderImage
                                className={classNames([
                                    styles.buttonVisual,
                                    styles.buttonVisualPlaceholder,
                                ])}
                            />
                            <PlaceholderText
                                lines={2}
                                className={classNames([
                                    styles.buttonLabel,
                                    styles.buttonLabelPlaceholder,
                                ])}
                            />
                        </ScreenElement>
                    ) : null}

                    {isEmpty && isPlaceholder ? (
                        <PlaceholderButton className={styles.buttonPlaceholder} />
                    ) : null}
                </Button>
            </div>
        );
    });

    const {
        heading: popupHeading = null,
        content: popupContent = null,
        largeVisual = null,
    } = popup || {};

    const hasPopupContent = useMemo(() => {
        const {
            heading = null,
            content = null,
            largeVisual: popupLargeVisual = null,
        } = popup || {};
        const { body: headingBody = null } = heading || {};
        const { body: contentBody = null } = content || {};
        return (
            (headingBody !== null && headingBody !== '') ||
            (contentBody !== null && contentBody !== '') ||
            popupLargeVisual !== null
        );
    }, [popup]);

    // for editor purposes
    const screenState = useScreenState();

    useEffect(() => {
        if (screenState === 'popup') {
            setPopup(placeholderPopupBoxStyles); // @note force placeholder
            setShowPopup(1);
        }
        if (screenState === 'keypad') {
            setPopup(null);
            setShowPopup(0);
        }
        if (screenState !== null && screenState.includes('items')) {
            const index = screenState.split('.').pop();
            const found = items[index];
            setShowPopup(1);
            setPopup(found);
        }
        if (screenState === null) {
            setShowPopup(0);
            setPopup(null);
        }
    }, [screenState, items]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.withSquareItems]: withSquareItems,
                },
            ])}
            data-screen-ready
        >
            {/* @todo needed? */}
            {/* {!isView ? <div {...mouseBlocker} /> : null} */}
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    mediaRef={mediaRef}
                    className={styles.background}
                />
            ) : null}
            <Container width={width} height={height} className={styles.inner}>
                <Layout
                    className={styles.layout}
                    verticalAlign={layout}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                  paddingBottom:
                                      (current && !isPreview ? viewerBottomHeight : 0) + spacing,
                              }
                            : null
                    }
                >
                    <Keypad
                        className={classNames([
                            styles.grid,
                            { [styles.gridPlaceholder]: isPlaceholder },
                        ])}
                        align={columnAlign}
                        columns={isPlaceholder ? 3 : columns}
                        spacing={isPlaceholder ? 2 : spacing}
                    >
                        {gridItems}
                    </Keypad>
                </Layout>

                <animated.div
                    className={classNames([styles.popupBackdrop])}
                    style={{
                        ...getStyleFromColor(popupBackdrop),
                        opacity: popupSpring.to((p) => p),
                    }}
                />
                <animated.div
                    className={styles.popup}
                    style={{
                        transform: popupSpring.to(
                            (p) => `translateY(${100 * (1 - (p < 0.2 ? 0.1 * p + p : p))}%)`,
                        ),
                        pointerEvents: popupSpring.to((p) => (p < 0.1 ? 'none' : 'auto')),
                    }}
                    {...bindPopupDrag()}
                >
                    <Scroll>
                        <button
                            type="button"
                            className={styles.popupButton}
                            onClick={() => {
                                if (onCloseModal !== null) {
                                    onCloseModal();
                                }
                            }}
                        >
                            <div
                                className={classNames([
                                    styles.popupInner,
                                    styles[popupLayoutClassName],
                                ])}
                                style={{
                                    ...getStyleFromBox(placeholderPopupBoxStyles),
                                    ...getStyleFromBox(popupBoxStyle),
                                    ...getStyleFromText(popupTextStyle),
                                }}
                            >
                                <div className={styles.popupWrapper}>
                                    {!hasPopupContent ? (
                                        <>
                                            <PlaceholderTitle
                                                className={classNames([
                                                    styles.placeholder,
                                                    styles.popupHeading,
                                                ])}
                                                lines={1}
                                                height={1}
                                                withInvertedColors={false}
                                            />
                                            <PlaceholderText
                                                className={classNames([
                                                    styles.placeholder,
                                                    styles.popupContent,
                                                ])}
                                                lines={5}
                                                lineMargin={5}
                                                withInvertedColors={false}
                                            />
                                            <PlaceholderImage
                                                className={classNames([
                                                    styles.placeholder,
                                                    styles.popupMedia,
                                                ])}
                                                height="10em"
                                                withInvertedColors={false}
                                            />
                                        </>
                                    ) : null}

                                    {hasPopupContent ? (
                                        <>
                                            {popupHeading !== null ? (
                                                <Heading
                                                    className={styles.popupHeading}
                                                    {...popupHeading}
                                                />
                                            ) : null}
                                            {popupContent !== null ? (
                                                <Text
                                                    className={styles.popupContent}
                                                    {...popupContent}
                                                />
                                            ) : null}
                                            {largeVisual !== null ? (
                                                <Visual
                                                    className={styles.popupMedia}
                                                    media={largeVisual}
                                                    width="100%"
                                                />
                                            ) : null}
                                        </>
                                    ) : null}
                                </div>
                            </div>
                        </button>
                    </Scroll>
                </animated.div>
            </Container>
        </div>
    );
};

KeypadScreen.propTypes = propTypes;
KeypadScreen.defaultProps = defaultProps;

export default React.memo(KeypadScreen);
