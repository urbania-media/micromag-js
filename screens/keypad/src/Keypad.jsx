/* eslint-disable react/jsx-props-no-spreading */
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderButton, ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenState,
    useScreenRenderContext,
    usePlaybackContext,
    usePlaybackMediaRef,
    useViewerContext,
    useViewerWebView,
    useViewerInteraction,
} from '@micromag/core/contexts';
import { useDragProgress, useTrackScreenEvent, useDimensionObserver } from '@micromag/core/hooks';
import {
    isTextFilled,
    getStyleFromText,
    getStyleFromBox,
    isHeaderFilled,
    isFooterFilled,
    getFooterProps,
    camelCase,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
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
    title: MicromagPropTypes.headingElement,
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
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    items: null,
    title: null,
    layout: null,
    spacing: 20,
    keypadSettings: null,
    buttonStyles: null,
    popupStyles: null,
    header: null,
    footer: null,
    background: null,
    current: true,
    active: true,
    className: null,
};

const KeypadScreen = ({
    items,
    title,
    layout,
    spacing,
    keypadSettings,
    buttonStyles,
    popupStyles,
    header,
    footer,
    background,
    current,
    active,
    className,
}) => {
    const containerRef = useRef(null);
    const popupInnerRef = useRef(null);

    const trackScreenEvent = useTrackScreenEvent('keypad');
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const screenState = useScreenState();

    const { width, height, resolution } = useScreenSize();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const hasTitle = isTextFilled(title);
    const { textStyle: titleTextStyle = null } = title || {};

    const { ref: headerRef, height: headerHeight = 0 } = useDimensionObserver();
    const { ref: footerRef, height: footerHeight = 0 } = useDimensionObserver();

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
        headingTextStyle = null,
        contentTextStyle = null,
        button: popupButtons = null,
        boxStyle: popupBoxStyle = null,
    } = popupStyles || {};

    const { buttonTextStyle: popupButtonsTextStyle = null, boxStyle: popupButtonsBoxStyle = null } =
        popupButtons || {};

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
    const {
        label: buttonLabel = null,
        url: buttonUrl = null,
        inWebView: popupInWebView = false,
        boxStyle: popupButtonBoxStyle = null,
    } = popupButton || {};

    const onItemClick = useCallback(
        (e, item) => {
            e.stopPropagation();
            trackScreenEvent('click_item', item);

            const { inWebView = false, url = null } = item || {};

            if (inWebView && url !== null) {
                openWebView({
                    url,
                });
                return;
            }
            setPopup(item);
            setShowPopup(true);
        },
        [disableInteraction, setPopup, trackScreenEvent],
    );

    const onCloseModal = useCallback(() => {
        setShowPopup(false);
        trackScreenEvent('close_modal');
    }, [enableInteraction, setShowPopup, trackScreenEvent]);

    const [popupDragDirection, setPopupDragDirection] = useState(0);

    const onPopupScrollHeightChange = useCallback(
        ({ scrolleeHeight = 0 }) => {
            if (Math.floor(scrolleeHeight) >= Math.floor(height)) {
                setPopupDragDirection('top');
            } else {
                setPopupDragDirection('bottom');
            }
        },
        [height],
    );

    const computePopupProgress = useCallback(
        ({ active: dragActive, movement: [, my], velocity: [, vy] }) => {
            const damper = 0.5;
            const delta = Math.abs(my) / window.innerHeight;
            const reachedThreshold = vy > 1 || delta > 0.3;
            let progress = 0;

            if (popupDragDirection === 'top' && my < 0) {
                progress = delta * damper * -1;
            } else if (popupDragDirection === 'bottom' && my > 0) {
                progress = delta * damper;
            }

            if (!dragActive) {
                if (reachedThreshold) {
                    onCloseModal();
                    return 1;
                }
                return 0;
            }

            return progress;
        },
        [onCloseModal, popupDragDirection],
    );

    useEffect(() => {
        if (showPopup) {
            disableInteraction();
        } else {
            enableInteraction();
        }
    }, [showPopup]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                (!current && isView) ||
                (popupInnerRef.current &&
                    !popupInnerRef.current.contains(event.target) &&
                    containerRef.current &&
                    containerRef.current.contains(event.target) &&
                    !isInteractivePreview &&
                    !isEdit &&
                    showPopup)
            ) {
                onCloseModal();
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [current, popupInnerRef, containerRef, isInteractivePreview, isEdit, showPopup]);

    const [popupDragDisabled, setPopupDragDisabled] = useState(false);

    const onPopupScrollBottom = useCallback(() => {
        setPopupDragDisabled(false);
    }, [setPopupDragDisabled]);

    const onPopupScrollNotBottom = useCallback(() => {
        setPopupDragDisabled(true);
    }, [setPopupDragDisabled]);

    const { bind: bindPopupDrag, progress: popupSpring } = useDragProgress({
        disabled: !isView || popupDragDisabled,
        progress: showPopup ? 0 : 1,
        computeProgress: computePopupProgress,
        springParams: { config: { tension: 300, friction: 30 } },
    });

    useEffect(() => {
        const keyup = (e) => {
            if (e.key === 'Escape') {
                if (showPopup) {
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
                    (heading === null || headingBody === null || headingBody === '') &&
                    (content === null || contentBody === null || contentBody === '') &&
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
                                !isPopupEmpty || (url !== null && !isExternalLink)
                                    ? (e) => onItemClick(e, item)
                                    : null
                            }
                        >
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
                                {visual !== null ? (
                                    <Visual
                                        className={styles.buttonVisual}
                                        imageClassName={styles.thumbnail}
                                        media={visual}
                                        width="auto"
                                    />
                                ) : null}
                            </ScreenElement>

                            <ScreenElement
                                placeholder={<PlaceholderButton />}
                                emptyLabel={
                                    <FormattedMessage
                                        defaultMessage="Label"
                                        description="Placeholder label"
                                    />
                                }
                                emptyClassName={classNames([styles.empty, styles.emptyButtonLabel])}
                                isEmpty={label === null}
                            >
                                {label !== null || !isInteractivePreview ? (
                                    <div className={styles.buttonLabel}>{label}</div>
                                ) : null}
                            </ScreenElement>
                        </Button>
                    </div>
                );
            }),
        [items, screenState, keypadSettings],
    );

    useEffect(() => {
        if (screenState === 'popup' && isPlaceholder) {
            setPopup(placeholderPopupBoxStyles); // @note force placeholder
            setShowPopup(true);
        }
        if (screenState === 'keypad') {
            setPopup(null);
            setShowPopup(false);
        }
        if (screenState !== null && screenState.includes('popup')) {
            const index = screenState.split('.').pop();
            const found = items[index];
            setPopup(found);
            setShowPopup(true);
        }
        if (screenState === null) {
            setPopup(null);
            setShowPopup(false);
        }
    }, [screenState, items]);

    return (
        <div
            ref={containerRef}
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
                    withArrow={!showPopup}
                    withShadow={!showPopup}
                    disabled={isPreview || isPlaceholder || showPopup}
                >
                    <Layout
                        className={styles.layout}
                        verticalAlign={layout}
                        width={width}
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop:
                                          (hasHeader ? headerHeight : spacing) +
                                          (current && !isPreview ? viewerTopHeight : 0),
                                      paddingBottom:
                                          (hasFooter ? footerHeight : spacing) +
                                          (current && !isPreview ? viewerBottomHeight : 0),
                                  }
                                : null
                        }
                    >
                        {!isPlaceholder && hasHeader ? (
                            <div
                                ref={headerRef}
                                className={styles.header}
                                style={{
                                    paddingTop: spacing / 2,
                                    paddingLeft: spacing,
                                    paddingRight: spacing,
                                    paddingBottom: spacing,
                                    transform: !isPreview
                                        ? `translate(0, ${viewerTopHeight}px)`
                                        : null,
                                }}
                            >
                                <Header {...header} />
                            </div>
                        ) : null}

                        <ScreenElement
                            placeholder="Title"
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Title"
                                    description="Placeholder label"
                                />
                            }
                            emptyClassName={classNames([styles.empty, styles.emptyHeading])}
                            isEmpty={!hasTitle}
                        >
                            {hasTitle ? (
                                <Heading
                                    className={styles.title}
                                    {...title}
                                    textStyle={titleTextStyle}
                                />
                            ) : null}
                        </ScreenElement>

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
                        {!isPlaceholder && hasFooter ? (
                            <div
                                ref={footerRef}
                                className={styles.footer}
                                style={{
                                    transform:
                                        current && !isPreview
                                            ? `translate(0, -${viewerBottomHeight}px)`
                                            : null,
                                    paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                                    paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                                    paddingBottom: spacing / 2,
                                    paddingTop: spacing,
                                }}
                            >
                                <Footer {...footerProps} />
                            </div>
                        ) : null}
                    </Layout>
                    {popup !== null ? (
                        <>
                            <animated.div
                                className={classNames([styles.popupBackdrop])}
                                style={{
                                    opacity: popupSpring.to((p) => 1 - Math.abs(p)),
                                }}
                            />

                            <animated.div
                                className={styles.popup}
                                style={{
                                    transform: popupSpring.to(
                                        (p) =>
                                            `translateY(${
                                                100 * p
                                                // 100 * (1 - (p < 0.2 && p > -0.2 ? 0.1 * p + p : p))
                                            }%) scale(${1 - Math.abs(p * 0.5)})`,
                                    ),
                                    pointerEvents: popupSpring.to((p) =>
                                        Math.abs(p) > 0.5 ? 'none' : 'auto',
                                    ),
                                }}
                                {...bindPopupDrag()}
                            >
                                <Scroll
                                    disabled={isPreview || isPlaceholder}
                                    verticalAlign="middle"
                                    withArrow={false}
                                    scrollPosition={!showPopup ? 1 : null}
                                    onScrolledBottom={onPopupScrollBottom}
                                    onScrolledNotBottom={onPopupScrollNotBottom}
                                    onScrollHeightChange={onPopupScrollHeightChange}
                                    className={styles.popupScroll}
                                    withShadow
                                >
                                    <div
                                        ref={popupInnerRef}
                                        className={classNames([
                                            styles.popupInner,
                                            styles[popupLayoutClassName],
                                        ])}
                                        style={{
                                            ...getStyleFromBox(placeholderPopupBoxStyles),
                                            ...getStyleFromBox(popupBoxStyle),
                                        }}
                                    >
                                        <ScreenElement
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
                                            {largeVisual !== null ? (
                                                <Visual
                                                    className={styles.popupVisual}
                                                    media={largeVisual}
                                                    width="100%"
                                                />
                                            ) : null}
                                        </ScreenElement>
                                        <ScreenElement
                                            placeholder="button"
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Button"
                                                    description="Placeholder label"
                                                />
                                            }
                                            emptyClassName={classNames([
                                                styles.empty,
                                                styles.emptyCTA,
                                            ])}
                                            isEmpty={popupButton === null}
                                        >
                                            {popupButton !== null ? (
                                                <CallToAction
                                                    className={styles.popupCTA}
                                                    label={{
                                                        ...popupButtonsTextStyle,
                                                        ...buttonLabel,
                                                    }}
                                                    url={buttonUrl}
                                                    inWebView={popupInWebView}
                                                    openWebView={openWebView}
                                                    type="click"
                                                    boxStyle={{
                                                        ...popupButtonsBoxStyle,
                                                        ...popupButtonBoxStyle,
                                                    }}
                                                />
                                            ) : null}
                                        </ScreenElement>
                                    </div>
                                </Scroll>
                            </animated.div>
                        </>
                    ) : null}
                </Scroll>
            </Container>
        </div>
    );
};

KeypadScreen.propTypes = propTypes;
KeypadScreen.defaultProps = defaultProps;

export default KeypadScreen;
