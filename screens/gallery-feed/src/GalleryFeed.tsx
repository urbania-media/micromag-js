import classNames from 'classnames';
import React, { useCallback, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type {
    BackgroundElement,
    Footer as FooterConfig,
    Header as HeaderConfig,
    ImageElementWithCaption,
    ImageMedia,
    TextStyle,
} from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useDimensionObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import {
    getFooterProps,
    isFooterFilled,
    isHeaderFilled,
    isImageFilled,
    isTextFilled,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './gallery-feed.module.css';

interface GalleryFeedScreenProps {
    layout?: 'normal' | 'reverse';
    images?: ImageElementWithCaption[] | ImageMedia[] | null;
    withCaptions?: boolean;
    imageCaptionStyle?: TextStyle | null;
    spacing?: number;
    background?: BackgroundElement | null;
    header?: HeaderConfig | null;
    footer?: FooterConfig | null;
    current?: boolean;
    active?: boolean;
    preload?: boolean;
    type?: string | null;
    className?: string | null;
}

function GalleryFeedScreen({
    layout = 'normal',
    images = null,
    withCaptions = false,
    imageCaptionStyle = null,
    spacing: initialSpacing = 20,
    background = null,
    header = null,
    footer = null,
    current = true,
    active = true,
    preload = true,
    type = null,
    className = null,
}: GalleryFeedScreenProps) {
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, resolution } = useScreenSize();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(current, true);
    const spacing = initialSpacing !== null ? Math.max(0, initialSpacing || 0) : 20;

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const mediaShouldLoad = current || preload;
    const hasImages = images !== null;
    const imagesCount = hasImages ? images.length : 0;
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded >= imagesCount;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const isReversed = layout === 'reverse';

    const items = [];

    const editImages = isEdit && imagesCount === 0 ? [null] : images;
    const finalImages = isPlaceholder ? [...Array(5)] : editImages;

    const { ref: firstImageRef, width: firstImageRefWidth } = useDimensionObserver();

    (finalImages || []).forEach((image, index) => {
        const finalImage = withCaptions ? image : { media: image };
        const { caption = null } = finalImage || {};
        const hasImage = isImageFilled(finalImage);
        const hasCaption = isTextFilled(caption);
        const { textStyle = null } = caption || {};

        const imageElement = (
            <ScreenElement
                key={`image-${index}`}
                placeholder="image"
                emptyLabel={
                    <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                }
                emptyClassName={styles.emptyImage}
                isEmpty={!hasImage}
            >
                <div className={styles.imageContainer} ref={index === 0 ? firstImageRef : null}>
                    <Visual
                        {...finalImage}
                        loadingMode="lazy"
                        className={styles.image}
                        videoClassName={styles.video}
                        width={firstImageRefWidth}
                        resolution={resolution}
                        playing={backgroundPlaying}
                        active={active}
                        shouldLoad={mediaShouldLoad}
                        withoutVideo={isPreview}
                        onLoaded={onImageLoaded}
                    />
                </div>
            </ScreenElement>
        );

        let captionElement = null;

        if (withCaptions) {
            const marginTop = !isReversed || index > 0 ? spacing / 2 : 0;
            const marginBottom =
                isReversed || index < (finalImages || []).length - 1 ? spacing / 2 : 0;
            captionElement = (
                <ScreenElement
                    key={`caption-${index}`}
                    placeholder="text"
                    placeholderProps={{ lines: 2 }}
                    emptyLabel={
                        <FormattedMessage
                            defaultMessage="Caption"
                            description="Caption placeholder"
                        />
                    }
                    emptyClassName={styles.emptyCaption}
                    isEmpty={!hasCaption}
                >
                    {hasCaption ? (
                        <div
                            className={styles.caption}
                            style={{
                                marginTop,
                                marginBottom,
                            }}
                        >
                            <Text
                                {...caption}
                                textStyle={{
                                    ...(imageCaptionStyle || null),
                                    ...textStyle,
                                }}
                                className={styles.captionText}
                            />
                        </div>
                    ) : null}
                </ScreenElement>
            );
        }

        if (isReversed) {
            if (withCaptions) {
                items.push(captionElement);
            }
            items.push(imageElement);
        } else {
            items.push(imageElement);
            if (withCaptions) {
                items.push(captionElement);
            }
        }

        if (!isPlaceholder && index < (finalImages || []).length - 1) {
            items.push(<div key={`spacing-${index}`} style={{ height: spacing }} />);
        }
    });

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const [scrolledBottom, setScrolledBottom] = useState(false);

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
                },
            ])}
            data-screen-ready={ready}
        >
            <Container width={width} height={height} className={styles.content}>
                <Scroll
                    disabled={scrollingDisabled}
                    onScrolledTrigger={onScrolledTrigger}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    withShadow
                >
                    <Layout
                        className={styles.layout}
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
                                          spacing / 2,
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
                            >
                                <Header {...header} />
                            </div>
                        ) : null}
                        {items}
                        {!isPlaceholder && hasFooter ? (
                            <div
                                className={classNames([
                                    styles.footer,
                                    {
                                        [styles.disabled]: !scrolledBottom,
                                    },
                                ])}
                                style={{
                                    paddingLeft: Math.max(viewerBottomSidesWidth - spacing, 0),
                                    paddingRight: Math.max(viewerBottomSidesWidth - spacing, 0),
                                    paddingTop: spacing,
                                }}
                            >
                                <Footer {...footerProps} />
                            </div>
                        ) : null}
                    </Layout>
                </Scroll>
            </Container>
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
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
}

export default GalleryFeedScreen;
