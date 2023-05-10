/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    PlaceholderImage,
    PlaceholderText,
    PlaceholderTitle,
    ScreenElement,
    Close,
} from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerContext,
    useViewerContainer,
    useViewerWebView,
    useViewerInteraction,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import {
    useActivityDetector,
    useDebounce,
    useTrackScreenEvent,
    useResizeObserver,
} from '@micromag/core/hooks';
import {
    isTextFilled,
    isHeaderFilled,
    isFooterFilled,
    getFooterProps,
    getStyleFromText,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './urbania-recommendation.module.scss';

const propTypes = {
    category: MicromagPropTypes.headingElement,
    visual: PropTypes.shape({
        image: MicromagPropTypes.visualElement,
        visualLayout: PropTypes.oneOf(['label-bottom', 'label-top']),
    }),
    title: MicromagPropTypes.headingElement,
    date: MicromagPropTypes.textElement,
    location: MicromagPropTypes.textElement,
    description: MicromagPropTypes.textElement,
    sponsor: MicromagPropTypes.textElement,
    spacing: PropTypes.number,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    category: null,
    visual: null,
    title: null,
    date: null,
    location: null,
    description: null,
    sponsor: null,
    spacing: 20,
    header: null,
    footer: null,
    background: null,
    current: true,
    active: true,
    className: null,
};

const UrbaniaRecommendation = ({
    category,
    visual,
    title,
    date,
    location,
    description,
    sponsor,
    spacing,
    header,
    footer,
    background,
    current,
    active,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent();

    const { width, height, resolution } = useScreenSize();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { playing, muted, setControls, setPlaying, showControls, hideControls } =
        usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic } = useScreenRenderContext();

    const animateBackground = current && !isPlaceholder && !isStatic && !isPreview && !isEdit;

    const [backgroundAnimationStarted, setBackgroundAnimationStarted] = useState(animateBackground);
    const [didAnimate, setDidAnimate] = useState(false);

    const { image = null, visualLayout = null } = visual || {}; // note: image can be a video
    const { type = null } = image || {};

    const hasVisual = image !== null;
    const isVideo = type === 'video';
    const hasCategory = isTextFilled(category);
    const hasTitle = isTextFilled(title);
    const hasDate = isTextFilled(date);
    const hasLocation = isTextFilled(location);
    const hasDescription = isTextFilled(description);
    const hasSponsor = isTextFilled(sponsor);

    const hasTextCard =
        hasCategory || hasTitle || hasDate || hasLocation || hasDescription || hasSponsor;

    const backgroundPlaying = current && (isView || isEdit);
    const videoPlaying = current && (isView || isEdit) && playing;
    const mediaShouldLoad = current || active;

    const scrollingDisabled = (!isView && !isEdit) || !current;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });
    const [scrolledBottom, setScrolledBottom] = useState(false);

    const {
        ref: textContainerRef,
        entry: { contentRect: textContainerRect = null },
    } = useResizeObserver();
    const { width: textContainerWidth = 0, height: textContainerHeight = 0 } =
        textContainerRect || {};

    const {
        ref: visualWrapperRef,
        // entry: { contentRect: visualWrapperRect = null },
    } = useResizeObserver();
    // const { width: visualWrapperWidth = 0, height: visualWrapperHeight = 0 } =
    // visualWrapperRect || {};

    const [visualModalTransitioning, setVisualModalTransitioning] = useState(false);
    const [visualModalOpened, setVisualModalOpened] = useState(false);

    const { text: backgroundText = null } = background || {};
    const { body: backgroundTextBody = null, textStyle: backgroundTextStyle } =
        backgroundText || {};

    const finalBackgroundText = useMemo(() => {
        function distributeTextEqually(text) {
            const words = text !== null ? text.split(' ') : [];
            const numRows = 4;

            if (words.length < numRows / 2) {
                return Array(numRows).fill(text);
            }

            const halfNumWords = Math.ceil(words.length / 2);
            const firstHalf = words.slice(0, halfNumWords).join(' ');
            const secondHalf = words.slice(halfNumWords).join(' ');

            return [firstHalf, secondHalf, firstHalf, secondHalf];
        }

        const textArray = distributeTextEqually(backgroundTextBody);

        // @TODO: move container div here to avoid double map
        const textElements = (textArray || []).map((line) => <span>{line}</span>);

        return textElements;
    }, [backgroundTextBody]);

    // intro animation
    useEffect(() => {
        let id = null;
        if (backgroundAnimationStarted) {
            id = setTimeout(() => {
                setBackgroundAnimationStarted(false);
                setDidAnimate(true);
            }, 1600);
        }
        return () => {
            clearTimeout(id);
        };
    }, [
        backgroundAnimationStarted,
        animateBackground,
        setDidAnimate,
        setBackgroundAnimationStarted,
    ]);

    useEffect(() => {
        if (isView && !isStatic && current) {
            setBackgroundAnimationStarted(true);
        } else {
            setBackgroundAnimationStarted(false);
        }
    }, [isView, current, setBackgroundAnimationStarted]);

    // scroll events
    const onScrolledBottom = useCallback(
        ({ initial }) => {
            if (initial) {
                trackScreenEvent('scroll', 'Screen');
            }
            setScrolledBottom(true);
        },
        [trackScreenEvent],
    );

    const onScrolledNotBottom = useCallback(() => {
        setScrolledBottom(false);
    }, [setScrolledBottom]);

    // modal
    useEffect(() => {
        let id = null;
        if (visualModalTransitioning) {
            id = setTimeout(() => {
                setVisualModalTransitioning(false);
                setVisualModalOpened(true);
            }, 400);
        }
        return () => {
            clearTimeout(id);
        };
    }, [visualModalTransitioning, setVisualModalTransitioning]);

    const onClickVisual = useCallback(() => {
        if (!visualModalOpened) {
            setVisualModalTransitioning(true);
        }
    }, [setVisualModalOpened]);

    const onCloseModal = useCallback(() => {
        if (visualModalTransitioning) {
            setVisualModalTransitioning(false);
        }
        setVisualModalOpened(false);
    }, [setVisualModalOpened]);

    useEffect(() => {
        if (visualModalOpened) {
            disableInteraction();
        } else {
            enableInteraction();
        }
    }, [visualModalOpened]);

    useEffect(() => {
        const keyup = (e) => {
            if (e.key === 'Escape') {
                if (visualModalOpened) {
                    onCloseModal();
                }
            }
        };
        document.addEventListener('keyup', keyup);
        return () => {
            document.removeEventListener('keyup', keyup);
        };
    }, [visualModalOpened, onCloseModal]);

    // Modal video

    useEffect(() => {
        if (current && !backgroundAnimationStarted) {
            setPlaying(true);
        }
    }, [current, backgroundAnimationStarted]);

    useEffect(() => {
        if (!current) {
            return () => {};
        }

        if (visualModalOpened && isVideo) {
            setControls(true);
        } else {
            setControls(false);
        }
        return () => {
            if (visualModalOpened) {
                setControls(false);
            }
        };
    }, [current, setControls, visualModalOpened, isVideo]);

    const viewerContainer = useViewerContainer();
    const { detected: activityDetected } = useActivityDetector({
        element: viewerContainer,
        disabled: !isView,
        timeout: 2000,
    });
    const toggleControlsVisibility = useCallback(() => {
        if (activityDetected && isVideo && visualModalOpened) {
            showControls();
        } else {
            hideControls();
        }
    }, [activityDetected, showControls, isVideo, hideControls]);
    useDebounce(toggleControlsVisibility, activityDetected, 1000);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
        >
            <Container width={width} height={height} className={styles.content}>
                <Scroll
                    width={width}
                    height={height}
                    disabled={backgroundAnimationStarted || scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    verticalAlign="middle"
                    withShadow={!visualModalOpened}
                    withArrow={!visualModalOpened}
                >
                    <Layout
                        className={styles.layout}
                        width={width}
                        // height={height}
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing / 2,
                                      paddingBottom:
                                          (current && !isPreview ? viewerBottomHeight : 0) +
                                          spacing / 2,
                                      minHeight: height, // probably not the best
                                  }
                                : null
                        }
                    >
                        {!isPlaceholder && hasHeader ? (
                            <div
                                key="header"
                                style={{
                                    paddingBottom: spacing,
                                }}
                                className={classNames([
                                    styles.headerContainer,
                                    // { [styles.appear]: backgroundAnimationStarted },
                                ])}
                            >
                                <Header {...header} />
                            </div>
                        ) : null}
                        {!isPlaceholder ? <Spacer key="spacer-cta-top" /> : null}
                        {visualModalOpened ? (
                            <Button className={styles.close} onClick={onCloseModal}>
                                <Close className={styles.closeIcon} />
                            </Button>
                        ) : null}
                        {hasTextCard || isPlaceholder || isEdit ? (
                            <Container
                                className={classNames([
                                    styles.textCard,
                                    {
                                        [styles.isPlaceholder]: isPlaceholder,
                                        [styles.visualBottom]: visualLayout === 'label-top',
                                        [styles.appear]: backgroundAnimationStarted,
                                        [styles.modalOpened]:
                                            visualModalTransitioning || visualModalOpened,
                                    },
                                ])}
                            >
                                <div
                                    className={classNames([
                                        styles.visualContainer,
                                        {
                                            [styles.modalOpened]:
                                                visualModalTransitioning || visualModalOpened,
                                        },
                                    ])}
                                >
                                    <ScreenElement
                                        key="visual"
                                        placeholder={
                                            <PlaceholderImage
                                                className={styles.visualPlaceholder}
                                            />
                                        }
                                        emptyLabel={
                                            <FormattedMessage
                                                defaultMessage="Visual"
                                                description="Text placeholder"
                                            />
                                        }
                                        emptyClassName={classNames([
                                            styles.empty,
                                            styles.emptyVisual,
                                        ])}
                                        isEmpty={!hasVisual}
                                    >
                                        {hasVisual && !isVideo ? (
                                            <div
                                                ref={visualWrapperRef}
                                                className={classNames([
                                                    styles.visualWrapper,
                                                    {
                                                        [styles.modalOpened]:
                                                            visualModalTransitioning ||
                                                            visualModalOpened,
                                                    },
                                                ])}
                                                style={
                                                    visualModalTransitioning || visualModalOpened
                                                        ? { width, height }
                                                        : {
                                                              width: textContainerWidth,
                                                              height: 'auto',
                                                          }
                                                }
                                            >
                                                <Button
                                                    className={classNames([
                                                        styles.visualButton,
                                                        {
                                                            [styles.transitioning]:
                                                                visualModalTransitioning,
                                                        },
                                                    ])}
                                                    onClick={onClickVisual}
                                                    disabled={
                                                        backgroundAnimationStarted ||
                                                        visualModalOpened
                                                    }
                                                    style={{
                                                        transform: visualModalTransitioning
                                                            ? `scale(${width / textContainerWidth})`
                                                            : null,
                                                    }}
                                                >
                                                    <Visual
                                                        className={styles.visual}
                                                        imageClassName={styles.visual}
                                                        media={image}
                                                        width={
                                                            visualModalOpened
                                                                ? width
                                                                : textContainerWidth
                                                        }
                                                        resolution={resolution}
                                                        active={active}
                                                        shouldLoad={mediaShouldLoad}
                                                    />
                                                </Button>
                                            </div>
                                        ) : null}

                                        {hasVisual && isVideo ? (
                                            <div
                                                ref={visualWrapperRef}
                                                className={classNames([
                                                    styles.visualWrapper,
                                                    {
                                                        [styles.modalOpened]:
                                                            visualModalTransitioning ||
                                                            visualModalOpened,
                                                    },
                                                ])}
                                                style={
                                                    visualModalTransitioning || visualModalOpened
                                                        ? { width, height }
                                                        : {
                                                              width: textContainerWidth,
                                                              height: 'auto',
                                                          }
                                                }
                                            >
                                                <Button
                                                    className={classNames([
                                                        styles.visualButton,
                                                        {
                                                            [styles.transitioning]:
                                                                visualModalTransitioning,
                                                        },
                                                    ])}
                                                    onClick={onClickVisual}
                                                    disabled={
                                                        backgroundAnimationStarted ||
                                                        visualModalOpened
                                                    }
                                                    style={{
                                                        transform: visualModalTransitioning
                                                            ? `scale(${width / textContainerWidth})`
                                                            : null,
                                                    }}
                                                >
                                                    <Visual
                                                        media={image}
                                                        mediaRef={mediaRef}
                                                        width={
                                                            visualModalOpened ? width : width * 0.9
                                                        } // @TODO: fix magic numbers
                                                        height={visualModalOpened ? height : 250}
                                                        resolution={resolution}
                                                        objectFit={{ fit: 'cover' }}
                                                        shouldLoad={mediaShouldLoad}
                                                        muted={muted || !visualModalOpened}
                                                        withoutVideo={isPreview}
                                                        playing={videoPlaying}
                                                    />
                                                </Button>
                                            </div>
                                        ) : null}
                                    </ScreenElement>
                                    {/* // SPONSOR */}
                                    <ScreenElement
                                        key="sponsor"
                                        placeholder={
                                            <PlaceholderText
                                                className={styles.sponsorPlaceholder}
                                            />
                                        }
                                    >
                                        {hasSponsor ? (
                                            <Text
                                                className={classNames([
                                                    styles.sponsor,
                                                    { [styles.hasVisual]: hasVisual },
                                                ])}
                                                {...sponsor}
                                            />
                                        ) : null}
                                    </ScreenElement>
                                </div>
                                <div ref={textContainerRef} className={styles.text}>
                                    <ScreenElement
                                        key="category"
                                        placeholder={
                                            <PlaceholderTitle
                                                className={styles.categoryPlaceholder}
                                            />
                                        }
                                        emptyLabel={
                                            <FormattedMessage
                                                defaultMessage="Category"
                                                description="Category placeholder"
                                            />
                                        }
                                        emptyClassName={styles.emptyCategory}
                                        isEmpty={!hasCategory}
                                    >
                                        {hasCategory ? (
                                            <div
                                                className={styles.categoryContainer}
                                                style={{ width: textContainerHeight }}
                                            >
                                                <Heading
                                                    className={styles.category}
                                                    {...category}
                                                />
                                            </div>
                                        ) : null}
                                    </ScreenElement>
                                    <div
                                        className={classNames([
                                            styles.textContent,
                                            {
                                                [styles.isPlaceholder]: isPlaceholder,
                                            },
                                        ])}
                                    >
                                        <ScreenElement
                                            key="title"
                                            placeholder="title"
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Title"
                                                    description="Category placeholder"
                                                />
                                            }
                                            emptyClassName={styles.emptyText}
                                            isEmpty={!hasTitle}
                                        >
                                            {hasTitle ? (
                                                <div className={styles.titleContainer}>
                                                    <Heading className={styles.title} {...title} />
                                                </div>
                                            ) : null}
                                        </ScreenElement>

                                        <ScreenElement
                                            key="date"
                                            placeholder={
                                                <PlaceholderText
                                                    className={styles.datePlaceholder}
                                                />
                                            }
                                        >
                                            {hasDate ? (
                                                <Text className={styles.date} {...date} />
                                            ) : null}
                                        </ScreenElement>

                                        <ScreenElement
                                            key="location"
                                            placeholder={
                                                <PlaceholderText
                                                    className={styles.locationPlaceholder}
                                                />
                                            }
                                        >
                                            {hasLocation ? (
                                                <Text className={styles.location} {...location} />
                                            ) : null}
                                        </ScreenElement>

                                        <ScreenElement
                                            key="description"
                                            placeholder={
                                                <PlaceholderText
                                                    className={styles.descriptionPlaceholder}
                                                />
                                            }
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Description"
                                                    description="Text placeholder"
                                                />
                                            }
                                            emptyClassName={styles.emptyText}
                                            isEmpty={!hasDescription}
                                        >
                                            {hasDescription ? (
                                                <Text
                                                    className={styles.description}
                                                    {...description}
                                                />
                                            ) : null}
                                        </ScreenElement>
                                    </div>
                                </div>
                            </Container>
                        ) : null}
                        {!isPlaceholder ? <Spacer key="spacer-cta-bottom" /> : null}
                        {!isPlaceholder && hasFooter ? (
                            <div
                                key="footer"
                                className={classNames([
                                    styles.footer,
                                    {
                                        [styles.disabled]: !scrolledBottom && !visualModalOpened,
                                    },
                                ])}
                                style={{
                                    paddingTop: spacing,
                                    paddingLeft: Math.max(0, viewerBottomSidesWidth - spacing),
                                    paddingRight: Math.max(0, viewerBottomSidesWidth - spacing),
                                }}
                            >
                                <Footer {...footerProps} />
                            </div>
                        ) : null}
                    </Layout>
                </Scroll>
            </Container>
            {!isPlaceholder ? (
                <>
                    <Background
                        background={background}
                        width={width}
                        height={height}
                        resolution={resolution}
                        playing={backgroundPlaying && !visualModalOpened}
                        muted={muted || visualModalOpened}
                        shouldLoad={mediaShouldLoad}
                        withoutVideo={isPreview}
                        className={styles.background}
                    />
                    {backgroundText !== null && finalBackgroundText.length > 0 ? (
                        <Container
                            width={width}
                            height={height}
                            className={styles.backgroundTextContainer}
                        >
                            {(finalBackgroundText || []).map((line, i) => (
                                <div
                                    key={`background-text-${line}`}
                                    className={classNames([styles.backgroundText], {
                                        [styles.didAnimate]: didAnimate, // @TODO: optimise —> use animation-fill-mode?
                                        [styles.animateFromBottom]:
                                            backgroundAnimationStarted && i % 2 !== 0,
                                        [styles.animateFromTop]:
                                            backgroundAnimationStarted && i % 2 === 0,
                                    })}
                                    style={{
                                        animationDelay: `${i * 100}ms`,
                                        ...getStyleFromText(backgroundTextStyle),
                                    }}
                                >
                                    {line}
                                </div>
                            ))}
                        </Container>
                    ) : null}
                </>
            ) : null}
        </div>
    );
};

UrbaniaRecommendation.propTypes = propTypes;
UrbaniaRecommendation.defaultProps = defaultProps;

export default React.memo(UrbaniaRecommendation);
