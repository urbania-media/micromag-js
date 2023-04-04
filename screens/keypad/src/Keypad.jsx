/* eslint-disable react/jsx-props-no-spreading */
import { animated } from '@react-spring/web';
import camelCase from 'camelcase';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    PlaceholderText,
    PlaceholderImage,
    PlaceholderButton,
    ScreenElement,
} from '@micromag/core/components';
import {
    useScreenSize,
    useScreenState,
    useScreenRenderContext,
    usePlaybackContext,
    usePlaybackMediaRef,
    useViewerContext,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useDragProgress, useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled, getStyleFromText, getStyleFromBox } from '@micromag/core/utils';
import Background, { Background as PopupBackdrop } from '@micromag/element-background';
import Button from '@micromag/element-button';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Keypad from '@micromag/element-keypad';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './keypad.module.scss';

const placeholders = [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
    { id: '7' },
    { id: '8' },
    { id: '9' },
];
const placeholderPopupBoxStyles = {
    padding: {
        left: 30,
        top: 30,
        right: 30,
        bottom: 30,
    },
};

const stopDragEventsPropagation = {
    onTouchMove: (e) => e.stopPropagation(),
    onTouchStart: (e) => e.stopPropagation(),
    onTouchEnd: (e) => e.stopPropagation(),
    onPointerMove: (e) => e.stopPropagation(),
    onPointerUp: (e) => e.stopPropagation(),
    onPointerDown: (e) => e.stopPropagation(),
};

const mouseBlocker = {
    ...stopDragEventsPropagation,
    onClick: (e) => e.stopPropagation(),
    style: {
        position: 'fixed',
        zIndex: '1000',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        cursor: 'default',
    },
};

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
    spacing: PropTypes.number,
    keypadSettings: PropTypes.shape({
        layout: PropTypes.shape({
            columnAlign: PropTypes.oneOf(['left', 'right', 'middle']),
            columns: PropTypes.number,
            spacing: PropTypes.number,
            withSquareItems: PropTypes.bool,
        }),
    }),
    buttonStyles: PropTypes.shape({
        layout: PropTypes.string,
        textStyle: MicromagPropTypes.textStyle,
        boxStyle: MicromagPropTypes.boxStyle,
    }),
    popupStyles: PropTypes.shape({
        layout: PropTypes.oneOf(['content-top', 'content-split', 'content-bottom']),
        headingTextStyle: MicromagPropTypes.textStyle,
        contentTextStyle: MicromagPropTypes.textStyle,
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
    spacing: 20,
    keypadSettings: null,
    buttonStyles: null,
    popupStyles: null,
    background: null,
    current: true,
    active: true,
    className: null,
};

const KeypadScreen = ({
    items,
    layout,
    spacing,
    keypadSettings,
    buttonStyles,
    popupStyles,
    background,
    current,
    active,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent('keypad');
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const screenState = useScreenState();

    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();
    const { open: openWebView } = useViewerWebView();

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = !isPlaceholder && (current || active);
    const isInteractivePreview = isEdit && screenState === null;

    const { layout: keypadLayout = null } = keypadSettings || {};
    const {
        columnAlign = null,
        columns = null,
        spacing: columnSpacing = null,
        withSquareItems = false,
    } = keypadLayout || {};
    const {
        layout: buttonLayout = null,
        textStyle: buttonTextStyle = null,
        boxStyle: buttonBoxStyle = null,
    } = buttonStyles || {};
    const {
        layout: popupLayout = null,
        backdrop: popupBackdrop = null,
        headingTextStyle = null,
        contentTextStyle = null,
        boxStyle: popupBoxStyle = null,
    } = popupStyles || {};
    const popupLayoutClassName = useMemo(
        () => (popupLayout !== null ? camelCase(popupLayout) : ''),
        [popupLayout],
    );

    const [showPopup, setShowPopup] = useState(false);
    const [popup, setPopup] = useState(null);
    const {
        heading: popupHeading = null,
        content: popupContent = null,
        largeVisual = null,
        button: popupButton = null,
    } = popup || {};
    const hasPopupHeading = isTextFilled(popupHeading);
    const { textStyle: popupHeadingTextStyle = null } = popupHeading || {};
    const hasPopupContent = isTextFilled(popupContent);
    const { textStyle: popupContentTextStyle = null } = popupContent || {};
    const { color: backdropColor = null, image: backdropMedia = null } = popupBackdrop || {};
    const {
        label: buttonLabel = null,
        url: buttonUrl = null,
        inWebView: popupInWebView = false,
        boxStyle: popupButtonBoxStyle = null,
    } = popupButton || {};
    const onItemClick = useCallback(
        (e, item) => {
            const { inWebView = false, url = null } = item || {};
            e.stopPropagation();
            trackScreenEvent('click_item', item);
            if (inWebView && url !== null) {
                openWebView({
                    url,
                });
                return;
            }
            setPopup(item);
            setShowPopup(1);
        },
        [setPopup, trackScreenEvent],
    );

    const onCloseModal = useCallback(() => {
        setShowPopup(0);
        trackScreenEvent('close_modal');
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

    useEffect(() => {
        const keyup = (e) => {
            if (e.key === 'Escape') {
                if (showPopup === 1) {
                    onCloseModal();
                }
            }
        };
        document.addEventListener('keyup', keyup);
        return () => {
            document.removeEventListener('keyup', keyup);
        };
    }, [showPopup, onCloseModal]);

    const gridItems = useMemo(
        () =>
            (items === null || items.length === 0 ? placeholders : items).map((item) => {
                const {
                    id = null,
                    label = null,
                    visual = null,
                    textStyle = null,
                    boxStyle = null,
                    heading = null,
                    content = null,
                    url = null,
                    inWebView = false,
                    largeVisual: popupLargeVisual = null,
                } = item || {};
                const { url: visualUrl = null } = visual || {};
                const { body: headingBody = null } = heading || {};
                const { body: contentBody = null } = content || {};
                const key = label || visualUrl || id;

                const isEmpty = label === null && visual === null;
                const isExternalLink = url !== null && !inWebView;
                const isPopupEmpty =
                    (heading === null || headingBody === '') &&
                    (content === null || contentBody === '') &&
                    popupLargeVisual === null;

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
                                    [styles.isLink]: url !== null,
                                    [styles.disableHover]: isPopupEmpty && url === null,
                                },
                            ])}
                            style={{
                                ...getStyleFromBox(buttonBoxStyle),
                                ...getStyleFromText(buttonTextStyle),
                                ...getStyleFromBox(boxStyle),
                                ...getStyleFromText(textStyle),
                            }}
                            external={isExternalLink}
                            href={isExternalLink ? url : null}
                            onClick={
                                !isPopupEmpty || !isExternalLink
                                    ? (e) => onItemClick(e, item)
                                    : null
                            }
                        >
                            {isEmpty && (isInteractivePreview || isPreview) ? (
                                <>
                                    <PlaceholderImage className={styles.imagePlaceholder} />
                                    <PlaceholderText lines={2} />
                                </>
                            ) : (
                                <>
                                    {visual !== null || !isInteractivePreview ? (
                                        <ScreenElement
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Visual"
                                                    description="Placeholder label"
                                                />
                                            }
                                            emptyClassName={classNames([
                                                styles.empty,
                                                styles.buttonVisual,
                                                styles.emptyButtonVisual,
                                            ])}
                                            isEmpty={visual === null}
                                        >
                                            <Visual
                                                className={styles.buttonVisual}
                                                imageClassName={styles.thumbnail}
                                                media={visual}
                                                width="auto"
                                            />
                                        </ScreenElement>
                                    ) : null}

                                    {label !== null || !isInteractivePreview ? (
                                        <ScreenElement
                                            placeholder={<PlaceholderButton />}
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Label"
                                                    description="Placeholder label"
                                                />
                                            }
                                            emptyClassName={classNames([
                                                styles.empty,
                                                styles.emptyButtonLabel,
                                            ])}
                                            isEmpty={label === null}
                                        >
                                            <div className={styles.buttonLabel}>{label}</div>
                                        </ScreenElement>
                                    ) : null}
                                </>
                            )}
                        </Button>
                    </div>
                );
            }),
        [items, screenState, keypadSettings],
    );

    useEffect(() => {
        if (screenState === 'popup' && isPlaceholder) {
            setPopup(placeholderPopupBoxStyles); // @note force placeholder
            setShowPopup(1);
        }
        if (screenState === 'keypad') {
            setPopup(null);
            setShowPopup(0);
        }
        if (screenState !== null && screenState.includes('popup')) {
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
            {isEdit && screenState !== null ? <div {...mouseBlocker} /> : null}
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
                <Scroll
                    width={width}
                    height={height}
                    verticalAlign={layout}
                    disabled={isPreview || isPlaceholder || isEdit || showPopup !== 0}
                >
                    <Layout
                        className={styles.layout}
                        verticalAlign={layout}
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                      paddingBottom:
                                          (current && !isPreview ? viewerBottomHeight : 0) +
                                          spacing,
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
                            spacing={isPlaceholder ? 2 : columnSpacing}
                            items={gridItems}
                        />
                    </Layout>

                    <animated.div
                        className={classNames([styles.popupBackdrop])}
                        style={{
                            opacity: popupSpring.to((p) => p),
                        }}
                    >
                        <PopupBackdrop
                            width={width}
                            height={height}
                            resolution={resolution}
                            playing={backgroundPlaying}
                            media={backdropMedia}
                            color={backdropColor}
                            muted
                        />
                    </animated.div>

                    <animated.div
                        className={styles.popup}
                        style={{
                            transform: popupSpring.to(
                                (p) => `translateY(${100 * (1 - (p < 0.2 ? 0.1 * p + p : p))}%)`,
                            ),
                            pointerEvents: popupSpring.to((p) => (p < 0.1 ? 'none' : 'auto')),
                        }}
                        {...bindPopupDrag()}
                        onClick={() => {
                            if (onCloseModal !== null) {
                                onCloseModal();
                            }
                        }}
                    >
                        <Scroll
                            disabled={isPreview || isPlaceholder || isEdit}
                            verticalAlign="middle"
                            withArrow={false}
                            withShadow
                        >
                            <button type="button" className={styles.popupButton}>
                                <div
                                    className={classNames([
                                        styles.popupInner,
                                        styles[popupLayoutClassName],
                                    ])}
                                    style={{
                                        ...getStyleFromBox(placeholderPopupBoxStyles),
                                        ...getStyleFromBox(popupBoxStyle),
                                    }}
                                >
                                    <div className={styles.popupWrapper}>
                                        <ScreenElement
                                            placeholder="popupHeading"
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Heading"
                                                    description="Placeholder label"
                                                />
                                            }
                                            emptyClassName={classNames([
                                                styles.empty,
                                                styles.emptyHeading,
                                            ])}
                                            isEmpty={!hasPopupHeading}
                                        >
                                            {hasPopupHeading ? (
                                                <Heading
                                                    className={styles.popupHeading}
                                                    {...popupHeading}
                                                    textStyle={{
                                                        ...headingTextStyle,
                                                        ...popupHeadingTextStyle,
                                                    }}
                                                />
                                            ) : null}
                                        </ScreenElement>

                                        <ScreenElement
                                            placeholder="popupContent"
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Content"
                                                    description="Placeholder label"
                                                />
                                            }
                                            emptyClassName={classNames([
                                                styles.empty,
                                                styles.emptyContent,
                                            ])}
                                            isEmpty={!hasPopupContent}
                                        >
                                            {hasPopupContent ? (
                                                <Text
                                                    className={styles.popupContent}
                                                    {...popupContent}
                                                    textStyle={{
                                                        ...contentTextStyle,
                                                        ...popupContentTextStyle,
                                                    }}
                                                />
                                            ) : null}
                                        </ScreenElement>
                                        {largeVisual !== null ? (
                                            <ScreenElement
                                                placeholder="image"
                                                emptyLabel={
                                                    <FormattedMessage
                                                        defaultMessage="Visual (Image or Video)"
                                                        description="Placeholder label"
                                                    />
                                                }
                                                emptyClassName={classNames([
                                                    styles.empty,
                                                    styles.emptyVisual,
                                                ])}
                                                isEmpty={largeVisual === null}
                                            >
                                                <Visual
                                                    className={styles.popupVisual}
                                                    media={largeVisual}
                                                    width="100%"
                                                />
                                            </ScreenElement>
                                        ) : null}

                                        <ScreenElement
                                            placeholder="button"
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Button"
                                                    description="Placeholder label"
                                                />
                                            }
                                            emptyClassName={classNames([styles.empty])}
                                            isEmpty={popupButton === null}
                                        >
                                            {popupButton !== null ? (
                                                <CallToAction
                                                    className={styles.popupCTA}
                                                    label={buttonLabel}
                                                    url={buttonUrl}
                                                    inWebView={popupInWebView}
                                                    openWebView={openWebView}
                                                    type="click"
                                                    boxStyle={popupButtonBoxStyle}
                                                    style={{
                                                        ...getStyleFromBox(popupButtonBoxStyle),
                                                    }}
                                                />
                                            ) : null}
                                        </ScreenElement>
                                    </div>
                                </div>
                            </button>
                        </Scroll>
                    </animated.div>
                </Scroll>
            </Container>
        </div>
    );
};

KeypadScreen.propTypes = propTypes;
KeypadScreen.defaultProps = defaultProps;

export default React.memo(KeypadScreen);
