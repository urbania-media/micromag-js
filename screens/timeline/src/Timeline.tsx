import classNames from 'classnames';
import React, { ForwardedRef, useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type {
    Alternatives,
    BackgroundElement,
    Color,
    Footer as FooterConfig,
    Header as HeaderConfig,
    HeadingElement,
    MediaElement,
    TextElement,
    TextStyle,
} from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useViewerActivityDetected,
    useViewerContext,
    useViewerWebView,
} from '@micromag/core/contexts';
import {
    useDebounce,
    useDimensionObserver,
    useTrackScreenEvent,
    useTrackScreenMedia,
} from '@micromag/core/hooks';
import {
    getFooterProps,
    getStyleFromColor,
    isFooterFilled,
    isHeaderFilled,
    isTextFilled,
    mergeRefs,
} from '@micromag/core/utils';
import Audio from '@micromag/element-audio';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './timeline.module.css';

interface TimelineProps {
    layout?:
        | 'normal'
        | 'title-description-image'
        | 'title-image-description'
        | 'image-title-description';
    title?: HeadingElement | null;
    items?: TextElement[];
    itemTitleStyle?: TextStyle | null;
    itemDescriptionStyle?: TextStyle | null;
    withoutLine?: boolean;
    bulletColor?: Color | null;
    lineColor?: Color | null;
    bulletShape?: 'circle' | 'square';
    bulletFilled?: boolean;
    illustrated?: boolean;
    spacing?: number | null;
    header?: HeaderConfig | null;
    footer?: FooterConfig | null;
    background?: BackgroundElement | null;
    alternatives?: Alternatives | null;
    current?: boolean;
    active?: boolean;
    preload?: boolean;
    type?: string | null;
    mediaRef?: ForwardedRef<MediaElement> | null;
    className?: string | null;
}

const emptyItems = [null];

function Timeline({
    layout = 'normal',
    title = null,
    items = emptyItems,
    itemTitleStyle = null,
    itemDescriptionStyle = null,
    withoutLine = false,
    bulletColor = null,
    lineColor = null,
    bulletShape = 'circle',
    bulletFilled = true,
    illustrated = false,
    spacing: initialSpacing = null,
    itemBottomSpacing: initialItemBottomSpacing = null,
    header = null,
    footer = null,
    background = null,
    alternatives = null,
    current = true,
    active = true,
    preload = true,

    // transitions,
    // transitionStagger,
    type = null,
    mediaRef: customMediaRef = null,
    className = null,
}: TimelineProps) {
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, imageResolution, resolution } = useScreenSize();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const {
        muted,
        playing,
        setControls,
        setControlsSuggestPlay: _setControlsSuggestPlay,
        setControlsTheme,
        setPlaying,
        controlsVisible: _controlsVisible,
        showControls,
        hideControls,
    } = usePlaybackContext();
    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(current);

    const { audio: audioAlternative = null } = alternatives || {};
    const {
        autoPlay = false,
        loop = false,
        media: audioAlternativeMedia = null,
        withSeekBar = false,
        withControls = false,
        color = null,
        progressColor = null,
    } = audioAlternative || {};

    const finalAudioAlternative = useMemo(
        () =>
            audioAlternative !== null
                ? {
                      ...audioAlternative,
                      autoPlay: !isPreview && !isStatic && !isCapture && autoPlay && current,
                  }
                : null,
        [audioAlternative, isPreview, isStatic, isCapture, autoPlay, current],
    );

    const [hasPlayed, setHasPlayed] = useState(false);
    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const audioPlaying = current && (isView || isEdit) && playing && (isCurrentMedia || !isView);

    useEffect(() => {
        if (!current) {
            return () => {};
        }

        setControlsTheme({
            seekBarOnly: withSeekBar && !withControls,
            color,
            progressColor,
        });

        if (withControls || withSeekBar) {
            setControls(true);
        } else {
            setControls(false);
        }
        return () => {
            if (withControls || withSeekBar) {
                setControls(false);
            }
        };
    }, [current, withControls, setControls, withSeekBar, color, progressColor]);

    useEffect(() => {
        if (current && autoPlay) {
            setPlaying(true);
        }
    }, [current, autoPlay]);
    const activityDetected = useViewerActivityDetected();
    const toggleControlsVisibility = useCallback(() => {
        if (activityDetected) {
            showControls();
        } else {
            hideControls();
        }
    }, [activityDetected, showControls, hideControls]);
    useDebounce(current ? toggleControlsVisibility : null, activityDetected, 1000);

    const trackScreenMedia = useTrackScreenMedia('video');
    const [_currentTime, setCurrentTime] = useState(null);
    const [duration, setDuration] = useState(null);

    const [audioReady, setAudioReady] = useState(audioAlternativeMedia === null);

    const onAudioReady = useCallback(() => {
        setAudioReady(true);
    }, [setAudioReady]);

    const onAudioTimeUpdate = useCallback(
        (time = null) => {
            if (time !== null && typeof time.currentTarget !== 'undefined') {
                const { currentTime: targetTime = 0 } = time.currentTarget || {};
                setCurrentTime(targetTime);
            } else {
                setCurrentTime(0);
            }
        },
        [duration, setCurrentTime],
    );

    const onAudioProgressStep = useCallback(
        (step, meta) => {
            trackScreenMedia(
                audioAlternativeMedia,
                `progress_${Math.round(step * 100, 10)}%`,
                meta,
            );
        },
        [trackScreenMedia, audioAlternativeMedia],
    );

    const onAudioDurationChange = useCallback(
        (dur) => {
            setDuration(dur);
        },
        [setDuration],
    );

    const onAudioPlay = useCallback(
        ({ initial }) => {
            if (!hasPlayed) {
                setHasPlayed(true);
            }
            trackScreenMedia(audioAlternativeMedia, initial ? 'play' : 'resume');
        },
        [trackScreenMedia, audioAlternativeMedia],
    );

    const onAudioPause = useCallback(
        ({ midway }) => {
            trackScreenMedia(audioAlternativeMedia, midway ? 'pause' : 'ended');
        },
        [trackScreenMedia, audioAlternativeMedia],
    );

    const onAudioSeeked = useCallback(
        (time) => {
            if (time > 0) {
                trackScreenMedia(audioAlternativeMedia, 'seek', { currentTime: time });
            }
        },
        [trackScreenMedia, audioAlternativeMedia],
    );

    const onAudioEnded = useCallback(() => {
        if (current && !loop) {
            setPlaying(false);
        }
    }, [loop, current]);

    const finalItems = useMemo(
        () => (isPlaceholder ? [...new Array(5)].map(() => ({})) : items || [null]),
        [isPlaceholder, items],
    );

    const hasTitle = isTextFilled(title);

    const spacing = useMemo(
        () => (initialSpacing !== null ? Math.max(0, initialSpacing || 0) : 20),
        [initialSpacing],
    );
    const itemBottomSpacing = useMemo(
        () =>
            isPlaceholder
                ? 4
                : initialItemBottomSpacing !== null
                  ? Math.max(0, initialItemBottomSpacing || 0)
                  : 20,
        [isPlaceholder, initialItemBottomSpacing],
    );

    const itemsCount = finalItems !== null ? finalItems.length : 0;
    const hasItems = finalItems !== null && itemsCount;
    const imagesCount = hasItems
        ? finalItems.reduce((acc, curr) => {
              const { image = null } = curr || {};
              return acc + (image !== null ? 1 : 0);
          }, 0)
        : 0;

    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded >= imagesCount && audioReady;
    // const transitionsPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;
    const mediaShouldLoad = current || preload;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded((count) => count + 1);
    }, [setImagesLoaded]);

    // const {
    //     ref: firstLineRef,
    //     entry: { contentRect: firstLineContentRect = null },
    // } = useResizeObserver();
    // const {
    //     ref: firstContentRef,
    //     entry: { contentRect: firstContentRect = null },
    // } = useResizeObserver();
    // const { width: firstLineWidth = null } = firstLineContentRect || {};
    // const { width: firstContentWidth = null } = firstContentRect || {};

    const { ref: firstLineRef, width: firstLineWidth = null } = useDimensionObserver();
    const { ref: firstContentRef, width: firstContentWidth = null } = useDimensionObserver();

    const imageWidth = (firstContentWidth ?? 0) - (firstLineWidth ?? 0);

    // const firstLineRef = useRef(null);
    // const firstContentRef = useRef(null);
    // const [legacyImageWidth, setImageWidth] = useState(0);

    // useEffect(() => {
    //     if (firstContentRef.current === null) {
    //         return;
    //     }
    //     if (firstLineRef.current !== null) {
    //         setImageWidth(firstContentRef.current.offsetWidth - firstLineRef.current.offsetWidth);
    //     } else {
    //         setImageWidth(firstContentRef.current.offsetWidth);
    //     }
    // }, [width, height, finalItems]);

    // console.log('firstLineWidth', firstLineWidth);
    // console.log('firstContentWidth', firstContentWidth);
    // console.log('legacyImageWidth', legacyImageWidth);
    // console.log('imageWidth', imageWidth);

    const timelineElements = (finalItems || []).map((item, itemI) => {
        const { title: itemTitle = null, description = null, image = null } = item || {};

        const hasItemTitle = isTextFilled(itemTitle);
        const hasDescription = isTextFilled(description);
        const hasImage = image !== null;

        const elementsTypes = (layout === 'normal' ? 'title-description-image' : layout).split('-');

        const titleIndex = elementsTypes.indexOf('title');
        const imageIndex = elementsTypes.indexOf('image');

        if (!illustrated) {
            elementsTypes.splice(imageIndex, 1);
        }

        const typesCount = elementsTypes.length;
        const { textStyle: titleTextStyle } = itemTitle || {};
        const { textStyle: descriptionTextStyle } = description || {};

        return (
            <div className={styles.item} key={`item-${itemI}`}>
                {elementsTypes.map((elementType, typeI) => {
                    let elementContent = null;
                    let hasElement = false;

                    switch (elementType) {
                        case 'title':
                            hasElement = hasItemTitle;
                            elementContent = (
                                <div className={styles.title}>
                                    <ScreenElement
                                        placeholder="title"
                                        emptyLabel={
                                            <FormattedMessage
                                                defaultMessage="Entry Title"
                                                description="Title placeholder"
                                            />
                                        }
                                        emptyClassName={styles.empty}
                                        isEmpty={!hasItemTitle}
                                    >
                                        {hasItemTitle ? (
                                            <Heading
                                                {...itemTitle}
                                                textStyle={{
                                                    ...(itemTitleStyle || null),
                                                    ...titleTextStyle,
                                                }}
                                            />
                                        ) : null}
                                    </ScreenElement>
                                </div>
                            );
                            break;
                        case 'image':
                            hasElement = hasImage;
                            elementContent = (
                                <div className={styles.imageContainer}>
                                    <ScreenElement
                                        placeholder="image"
                                        emptyLabel={
                                            <FormattedMessage
                                                defaultMessage="Image"
                                                description="Image placeholder"
                                            />
                                        }
                                        emptyClassName={styles.empty}
                                        isEmpty={!hasImage}
                                    >
                                        {hasImage ? (
                                            <Visual
                                                className={styles.image}
                                                videoClassName={styles.video}
                                                loadingMode="lazy"
                                                media={image}
                                                width={imageWidth}
                                                resolution={resolution}
                                                playing={backgroundPlaying}
                                                active={active}
                                                shouldLoad={mediaShouldLoad}
                                                withoutVideo={isPreview}
                                                onLoaded={onImageLoaded}
                                            />
                                        ) : null}
                                    </ScreenElement>
                                </div>
                            );
                            break;
                        case 'description':
                            hasElement = hasDescription;
                            elementContent = (
                                <div className={styles.description}>
                                    <ScreenElement
                                        placeholder="text"
                                        emptyLabel={
                                            <FormattedMessage
                                                defaultMessage="Description"
                                                description="Description placeholder"
                                            />
                                        }
                                        emptyClassName={styles.empty}
                                        isEmpty={!hasDescription}
                                    >
                                        {hasDescription ? (
                                            <Text
                                                {...description}
                                                textStyle={{
                                                    ...(itemDescriptionStyle || null),
                                                    ...descriptionTextStyle,
                                                }}
                                            />
                                        ) : null}
                                    </ScreenElement>
                                </div>
                            );
                            break;
                        default:
                            elementContent = null;
                            hasElement = false;
                    }

                    const firstItem = itemI === 0;
                    const lastItem = itemI === itemsCount - 1;
                    const lastType = typeI === typesCount - 1;
                    const topLineHidden =
                        (firstItem && typeI <= titleIndex) || (lastItem && typeI > titleIndex);
                    const bottomLineHidden =
                        (firstItem && typeI < titleIndex) || (lastItem && typeI >= titleIndex);

                    return (
                        <div
                            key={`element-${elementType}`}
                            className={classNames([
                                styles.element,
                                styles[`element-${elementType}`],
                                {
                                    [styles.hidden]: (isView || isStatic) && !hasElement,
                                },
                            ])}
                            ref={itemI === 0 ? firstContentRef : null}
                        >
                            {!withoutLine ? (
                                <div
                                    className={styles.timeline}
                                    ref={itemI === 0 ? firstLineRef : null}
                                >
                                    <div
                                        className={classNames([
                                            styles.line,
                                            {
                                                [styles.hidden]: topLineHidden,
                                            },
                                        ])}
                                        style={{
                                            ...(!topLineHidden
                                                ? getStyleFromColor(lineColor, 'backgroundColor')
                                                : null),
                                        }}
                                    />
                                    {elementType === 'title' ? (
                                        <div
                                            className={styles.bullet}
                                            style={{
                                                ...getStyleFromColor(bulletColor, 'borderColor'),
                                                ...(bulletFilled
                                                    ? getStyleFromColor(
                                                          bulletColor,
                                                          'backgroundColor',
                                                      )
                                                    : null),
                                            }}
                                        />
                                    ) : null}
                                    <div
                                        className={classNames([
                                            styles.line,
                                            {
                                                [styles.hidden]: bottomLineHidden,
                                            },
                                        ])}
                                        style={{
                                            ...(!bottomLineHidden
                                                ? getStyleFromColor(lineColor, 'backgroundColor')
                                                : null),
                                        }}
                                    />
                                </div>
                            ) : null}
                            <div
                                className={styles.body}
                                style={{
                                    marginBottom: lastType && !lastItem ? itemBottomSpacing : 0,
                                }}
                            >
                                {elementContent}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    });

    // Call to Action
    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const [scrolledBottom, setScrolledBottom] = useState(false);
    const { ref: footerRef, height: footerHeight = 0 } = useDimensionObserver();

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

    const onScrolledTrigger = useCallback(
        (trigger = null) => {
            if (trigger !== null) {
                const scrollPercent = Math.round(trigger * 100);
                trackScreenEvent('scroll', scrollPercent, { scrollPercent });
            }
        },
        [trackScreenEvent],
    );

    return (
        <div
            className={classNames([
                styles.container,
                className,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles[`${bulletShape}BulletShape`]]: bulletShape !== null,
                    [styles.withoutLines]: itemsCount < 2,
                },
            ])}
            data-screen-ready={ready}
        >
            <Container width={width} height={height} className={styles.content}>
                <Scroll
                    className={styles.scroll}
                    verticalAlign="middle"
                    disabled={scrollingDisabled}
                    onScrolledTrigger={onScrolledTrigger}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    withShadow
                >
                    <Layout
                        style={
                            !isPlaceholder
                                ? {
                                      paddingLeft: spacing,
                                      paddingRight: spacing,
                                      paddingTop:
                                          (!isPreview ? viewerTopHeight : 0) +
                                          (hasHeader ? spacing / 2 : spacing),
                                      paddingBottom:
                                          (current && !isPreview ? viewerBottomHeight : 0) +
                                          (footerHeight || spacing),
                                  }
                                : null
                        }
                    >
                        {!isPlaceholder && hasHeader ? (
                            <div
                                style={{
                                    paddingBottom: spacing,
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
                            emptyClassName={classNames([styles.empty, styles.emptyTitle])}
                            isEmpty={!hasTitle}
                        >
                            {hasTitle ? (
                                <Heading
                                    className={styles.title}
                                    {...title}
                                    // textStyle={titleTextStyle}
                                />
                            ) : null}
                        </ScreenElement>

                        {timelineElements}
                    </Layout>
                </Scroll>
                {!isPlaceholder && hasFooter ? (
                    <div
                        ref={footerRef}
                        className={classNames([
                            styles.callToAction,
                            {
                                [styles.disabled]: !scrolledBottom,
                            },
                        ])}
                        style={{
                            transform:
                                current && !isPreview
                                    ? `translate(0, -${viewerBottomHeight}px)`
                                    : null,
                            paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                            paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                            paddingTop: spacing / 2,
                            paddingBottom: spacing / 2,
                        }}
                    >
                        <Footer {...footerProps} />
                    </div>
                ) : null}
            </Container>
            {audioAlternativeMedia !== null ? (
                <Audio
                    {...finalAudioAlternative}
                    paused={!audioPlaying}
                    mediaRef={mergeRefs(mediaRef, customMediaRef)}
                    muted={muted}
                    className={styles.audio}
                    shouldLoad={mediaShouldLoad}
                    onReady={onAudioReady}
                    onPlay={onAudioPlay}
                    onPause={onAudioPause}
                    onTimeUpdate={onAudioTimeUpdate}
                    onProgressStep={onAudioProgressStep}
                    onDurationChange={onAudioDurationChange}
                    onSeeked={onAudioSeeked}
                    onEnded={onAudioEnded}
                />
            ) : null}
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={imageResolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    mediaRef={
                        audioAlternativeMedia === null ? mergeRefs(mediaRef, customMediaRef) : null
                    }
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
}

export default Timeline;
