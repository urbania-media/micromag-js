/* eslint-disable react/jsx-props-no-spreading */
import { animated } from '@react-spring/web';
import classNames from 'classnames';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type {
    BackgroundElement,
    BoxStyle,
    Footer as FooterConfig,
    Header as HeaderConfig,
    HeadingElement,
    TextElement,
    TextStyle,
    VisualElement,
} from '@micromag/core';
import { Close, ScreenElement } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useScreenState,
    useViewerContext,
    useViewerInteraction,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useDimensionObserver, useDragProgress, useTrackScreenEvent } from '@micromag/core/hooks';
import {
    camelCase,
    getFooterProps,
    getStyleFromAlignment,
    getStyleFromBox,
    isFooterFilled,
    isHeaderFilled,
    isTextFilled,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button, { RichButton } from '@micromag/element-button';
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

import styles from './keypad.module.css';

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

interface KeypadScreenProps {
    items?:
        | {
              id?: string;
              heading?: HeadingElement;
              description?: TextElement;
              visual?: VisualElement;
              boxStyle?: BoxStyle;
          }[]
        | null;
    title?: HeadingElement | null;
    subtitle?: TextElement | null;
    layout?: 'top' | 'middle' | 'bottom' | null;
    spacing?: number;
    keypadSettings?: {
        layout?: {
            columnAlign?: 'left' | 'right' | 'middle';
            columns?: number;
            spacing?: number;
            withSquareItems?: boolean;
        };
    };
    keypadLayout?: {
        columnAlign?: 'left' | 'right' | 'middle';
        columns?: number;
        spacing?: number;
        withSquareItems?: boolean;
    } | null;
    buttonStyles?: {
        layout?: string;
        textStyle?: TextStyle;
        boxStyle?: BoxStyle;
        fillImage?: boolean;
        visualWidth?: number | string;
    } | null;
    popupStyles?: {
        layout?: 'content-top' | 'content-split' | 'content-bottom';
        headingTextStyle?: TextStyle;
        contentTextStyle?: TextStyle;
        boxStyle?: BoxStyle;
    } | null;
    header?: HeaderConfig | null;
    footer?: FooterConfig | null;
    background?: BackgroundElement | null;
    current?: boolean;
    preload?: boolean;
    withoutCloseButton?: boolean;
    className?: string | null;
}

function KeypadScreen({
    items = null,
    title = null,
    subtitle = null,
    layout = null,
    spacing = 20,
    keypadLayout = null,
    buttonStyles = null,
    popupStyles = null,
    header = null,
    footer = null,
    background = null,
    current = true,
    preload = true,
    withoutCloseButton = false,
    className = null,
}: KeypadScreenProps) {
    const containerRef = useRef(null);
    const popupInnerRef = useRef(null);

    const trackScreenEvent = useTrackScreenEvent('keypad');
    const { muted } = usePlaybackContext();
    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(current, true);

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

    const hasSubtitle = isTextFilled(subtitle);

    const { ref: headerRef, height: headerHeight = 0 } = useDimensionObserver();
    const { ref: footerRef, height: footerHeight = 0 } = useDimensionObserver();

    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const mediaShouldLoad = !isPlaceholder && (current || preload);
    const isInteractivePreview = isEdit && screenState === null;
    const isNotInteractive = isEdit && screenState !== null;

    const {
        columnAlign = null,
        columns = null,
        spacing: columnSpacing = null,
        withSquareItems = false,
    } = keypadLayout || {};

    const {
        layout: buttonLayout = null,
        textStyle: buttonTextStyle = null,
        labelBoxStyle: buttonLabelBoxStyle = null,
        boxStyle: buttonBoxStyle = null,
        visualWidth: buttonVisualWidth = null,
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
        popupBoxStyle: singlePopupBoxStyle = null,
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
        (e, item, index) => {
            e.stopPropagation();

            if (isNotInteractive) {
                return;
            }

            const {
                label: itemLabel = null,
                heading = null,
                inWebView = false,
                url = null,
            } = item || {};

            if (inWebView && url !== null) {
                openWebView({
                    url,
                });
            } else {
                setPopup(item);
                setShowPopup(true);
            }

            const { body: headingBody = null } = heading || {};
            const finalLabel = isString(itemLabel) ? itemLabel : (itemLabel || {}).body || null;
            trackScreenEvent(
                'click_item',
                [`#${index + 1}`, finalLabel || headingBody || '']
                    .filter((it) => !isEmpty(it))
                    .join(' '),
                {
                    linkType: 'keypad_item',
                    linkUrl: url || null,
                },
            );
        },
        [setPopup, setShowPopup, trackScreenEvent, openWebView, isNotInteractive],
    );

    const onCloseModal = useCallback(
        (isShowPopup = false) => {
            if (isNotInteractive) {
                return;
            }
            if (isShowPopup) {
                trackScreenEvent('close_modal');
            }
            setShowPopup(false);
        },
        [setShowPopup, trackScreenEvent, isNotInteractive],
    );

    const onClickClose = useCallback(
        (e) => {
            if (isNotInteractive) {
                return;
            }
            e.preventDefault();
            e.stopPropagation();
            onCloseModal(showPopup);
        },
        [onCloseModal, isNotInteractive, showPopup],
    );

    const onClickCta = useCallback((e = null) => {
        if (e !== null) {
            e.stopPropagation();
        }
    }, []);

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
            const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 0;
            const delta = windowHeight > 0 ? Math.abs(my) / windowHeight : 0;
            const reachedThreshold = vy > 1 || delta > 0.3;
            let progress = 0;
            if (popupDragDirection === 'top' && my < 0) {
                progress = delta * damper * -1;
            } else if (popupDragDirection === 'bottom' && my > 0) {
                progress = delta * damper;
            }
            if (!dragActive) {
                if (reachedThreshold) {
                    onCloseModal(true);
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
        function handleClickOutside(e) {
            if (
                (!current && isView) ||
                (popupInnerRef.current &&
                    !popupInnerRef.current.contains(e.target) &&
                    containerRef.current &&
                    containerRef.current.contains(e.target) &&
                    !isInteractivePreview &&
                    !isEdit &&
                    showPopup)
            ) {
                e.preventDefault();
                e.stopPropagation();
                onCloseModal(showPopup);
            }
        }
        document.addEventListener('mouseup', handleClickOutside);
        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [current, popupInnerRef, containerRef, isInteractivePreview, isEdit, showPopup]);

    const [popupDragDisabled, setPopupDragDisabled] = useState(false);

    const onPopupScrollBottom = useCallback(() => {
        setPopupDragDisabled(false);
    }, [setPopupDragDisabled]);

    const onPopupScrollNotBottom = useCallback(() => {
        setPopupDragDisabled(true);
    }, [setPopupDragDisabled]);

    const onScrolledTrigger = useCallback(
        (trigger = null) => {
            if (trigger !== null) {
                const scrollPercent = Math.round(trigger * 100);
                trackScreenEvent('scroll', scrollPercent, { scrollPercent });
            }
        },
        [trackScreenEvent],
    );

    const onTap = useCallback(() => {
        onCloseModal(showPopup);
    }, [onCloseModal, showPopup]);

    const { bind: bindPopupDrag, progress: popupSpring } = useDragProgress({
        disabled: !isView || popupDragDisabled,
        progress: showPopup ? 0 : 1,
        computeProgress: computePopupProgress,
        springParams: { config: { tension: 300, friction: 30 } },
        dragOptions: { filterTaps: true, preventDefault: true, stopPropagation: true },
        onTap,
    });

    useEffect(() => {
        const keyup = (e) => {
            if (e.key === 'Escape') {
                if (showPopup) {
                    onCloseModal(showPopup);
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
            (items === null || items.length === 0 ? placeholders : items).map((item, index) => {
                const {
                    id = null,
                    label: itemLabel = null,
                    visual = null,
                    boxStyle = null,
                    // alignment = null,
                    heading = null,
                    content = null,
                    url = null,
                    inWebView = false,
                    largeVisual: popupLargeVisual = null,
                } = item || {};

                const { url: visualUrl = null } = visual || {};
                const { body: headingBody = null } = heading || {};
                const { body: contentBody = null } = content || {};
                const finalLabel = isString(itemLabel) ? { body: itemLabel } : itemLabel || {};
                const { textStyle: finalLabelTextStyle = null } = finalLabel || {};
                const { body: finalBody = null } = finalLabel || {};

                const key = finalBody || visualUrl || id;
                const itemIsEmpty = finalBody === null && visual === null;
                const isExternalLink = url !== null && !inWebView;
                const isPopupEmpty =
                    (heading === null || headingBody === null || headingBody === '') &&
                    (content === null || contentBody === null || contentBody === '') &&
                    popupLargeVisual === null;

                return (
                    <div key={key} className={styles.item}>
                        <RichButton
                            className={classNames([
                                styles.button,
                                {
                                    [styles.isEmpty]: itemIsEmpty,
                                    [styles.isLink]: url !== null,
                                    [styles.disableHover]: isPopupEmpty && url === null,
                                },
                            ])}
                            layout={buttonLayout || null}
                            external={isExternalLink}
                            href={isExternalLink ? url : null}
                            focusable={current}
                            onClick={
                                !isPopupEmpty || (url !== null && !isExternalLink)
                                    ? (e) => onItemClick(e, item, index)
                                    : null
                            }
                            // style={{
                            //     ...getStyleFromAlignment(alignment, true, 'flex-start'),
                            // }}
                            textStyle={{ ...buttonTextStyle, ...finalLabelTextStyle }}
                            buttonStyle={{ ...buttonBoxStyle, ...boxStyle }}
                            label={finalLabel}
                            labelBoxStyle={buttonLabelBoxStyle}
                            visual={visual}
                            visualWidth={
                                buttonVisualWidth !== null ? `${buttonVisualWidth}%` : null
                            }
                            resolution={resolution}
                            textClassName={styles.buttonLabel}
                        />
                    </div>
                );
            }),
        [items, screenState, buttonBoxStyle, buttonTextStyle, buttonLayout, isNotInteractive],
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
        if (screenState === null && !isView) {
            setPopup(null);
            setShowPopup(false);
        }
    }, [screenState, items, isView, showPopup, setPopup, setShowPopup]);

    return (
        <div
            ref={containerRef}
            className={classNames([
                styles.container,
                className,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.withSquareItems]: withSquareItems,
                },
            ])}
            data-screen-ready
        >
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
            {isView && !isPlaceholder && !withoutCloseButton ? (
                <animated.div
                    className={classNames([styles.fixedHeader, { [styles.open]: showPopup }])}
                >
                    <div className={styles.buttons}>
                        <Button
                            className={styles.close}
                            onClick={onClickClose}
                            focusable={!isPreview && !isPlaceholder && showPopup}
                            withoutStyle
                        >
                            <Close color="#000" className={styles.closeIcon} />
                        </Button>
                    </div>
                </animated.div>
            ) : null}
            <Container width={width} height={height} className={styles.inner}>
                <Scroll
                    width={width}
                    height={height}
                    verticalAlign={layout}
                    withArrow={!showPopup}
                    withShadow={!showPopup}
                    disabled={isPreview || isPlaceholder || showPopup}
                    onScrolledTrigger={onScrolledTrigger}
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

                        <ScreenElement
                            placeholder="Subtitle"
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Subtitle"
                                    description="Placeholder label"
                                />
                            }
                            emptyClassName={classNames([styles.empty, styles.emptyHeading])}
                            isEmpty={!hasSubtitle}
                        >
                            {hasSubtitle ? (
                                <Text className={styles.subtitle} {...subtitle} />
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
                                            `translateY(${100 * p}%) scale(${
                                                1 - Math.abs(p * 0.5)
                                            })`,
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
                                            {
                                                [styles.withShadow]: popupBoxStyle === null,
                                            },
                                        ])}
                                        style={{
                                            ...getStyleFromBox(placeholderPopupBoxStyles),
                                            ...getStyleFromBox(popupBoxStyle),
                                            ...getStyleFromBox(singlePopupBoxStyle),
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
                                                    imageClassName={styles.popupVisualImage}
                                                    videoClassName={styles.popupVisualVideo}
                                                    media={largeVisual}
                                                    resolution={resolution}
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
                                                    onClick={onClickCta}
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
            </Container>
        </div>
    );
}

export default KeypadScreen;
