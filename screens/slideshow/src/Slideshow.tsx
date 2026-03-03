/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import React, { useCallback, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type {
    BackgroundElement,
    Footer as FooterConfig,
    Header as HeaderConfig,
    ImageElement,
    ImageMedia,
    Transitions as TransitionsConfig,
} from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerInteraction,
} from '@micromag/core/contexts';
import { useDimensionObserver } from '@micromag/core/hooks';
import { getFooterProps, isFooterFilled, isHeaderFilled, isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './slideshow.module.css';

interface SlideshowScreenProps {
    slides?: ImageMedia[] | ImageElement[];
    withCaptions?: boolean;
    spacing?: number;
    captionMaxLines?: number;
    transitionDelay?: number;
    background?: BackgroundElement;
    header?: HeaderConfig;
    footer?: FooterConfig;
    current?: boolean;
    active?: boolean;
    preload?: boolean;
    transitions?: TransitionsConfig;
    className?: string;
}

function SlideshowScreen({
    slides = [],
    withCaptions = false,
    background = null,
    header = null,
    footer = null,
    current = true,
    active = true,
    preload = true,
    spacing = 20,
    transitionDelay = 1,
    captionMaxLines = 2,
    transitions = null,
    className = null,
}) {
    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();
    const { enableInteraction, disableInteraction } = useViewerInteraction();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const { muted } = usePlaybackContext();
    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(current, true);
    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const mediaShouldLoad = current || preload;

    const finalSpacing = isPlaceholder ? 5 : spacing;

    const [imagesLoaded, setImagesLoaded] = useState(0);

    const ready = true;
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const imagesEl = useRef([]);

    // Head and foot
    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, {
        isView,
        current,
        isPreview,
        enableInteraction,
        disableInteraction,
    });

    const { ref: footerRef, height: footerHeight = 0 } = useDimensionObserver();
    const { ref: headerRef } = useDimensionObserver();

    const items = (slides || []).map((item, itemI) => {
        const { media = null, caption = null } = item || {};
        const imageSize = { width, height };

        const hasImage = media !== null;
        const hasCaption = isTextFilled(caption);

        const finalTransitionDelay = itemI > 0 ? itemI * (transitionDelay * 1000) : 0;

        return (
            <div key={`item-${itemI}`} className={styles.gridItem}>
                <div
                    className={styles.imageContainer}
                    ref={(el) => {
                        imagesEl.current[itemI] = el;
                    }}
                >
                    <Transitions
                        transitions={transitions}
                        delay={finalTransitionDelay}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                        fullscreen
                    >
                        <ScreenElement
                            placeholder="image"
                            placeholderProps={{ className: styles.placeholder, height: '100%' }}
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Image"
                                    description="Image placeholder"
                                />
                            }
                            emptyClassName={styles.emptyImage}
                            isEmpty={!hasImage}
                        >
                            {mediaShouldLoad ? (
                                <Visual
                                    className={styles.image}
                                    media={media}
                                    muted={muted}
                                    {...imageSize}
                                    resolution={resolution}
                                    objectFit={{ fit: 'cover' }}
                                    playing={backgroundPlaying}
                                    active={active}
                                    withoutVideo={isPreview}
                                    onLoaded={onImageLoaded}
                                />
                            ) : null}
                        </ScreenElement>
                    </Transitions>
                </div>
                {withCaptions ? (
                    <Transitions
                        transitions={transitions}
                        delay={finalTransitionDelay}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                    >
                        <ScreenElement
                            placeholder="line"
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
                                <div className={styles.caption}>
                                    <Text
                                        {...caption}
                                        className={styles.captionText}
                                        lineClamp={captionMaxLines}
                                    />
                                </div>
                            ) : null}
                        </ScreenElement>
                    </Transitions>
                ) : null}
            </div>
        );
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready={ready}
        >
            <Container width={width} height={height} className={styles.content}>
                <div
                    className={styles.inner}
                    style={{
                        paddingTop: !isPreview ? viewerTopHeight : null,
                        paddingBottom:
                            (hasFooter ? footerHeight - finalSpacing : 0) +
                            (current && !isPreview ? viewerBottomHeight : 0),
                    }}
                >
                    {isPlaceholder ? (
                        <ScreenElement
                            placeholder="image"
                            placeholderProps={{ className: styles.placeholder, height: '100%' }}
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Image"
                                    description="Image placeholder"
                                />
                            }
                        />
                    ) : null}
                    {!isPlaceholder && hasHeader ? (
                        <div
                            className={styles.header}
                            ref={headerRef}
                            style={{
                                padding: finalSpacing,
                                paddingTop: finalSpacing / 2,
                                transform: !isPreview ? `translate(0, ${viewerTopHeight}px)` : null,
                            }}
                        >
                            <Header {...header} />
                        </div>
                    ) : null}

                    {items}
                    {!isPlaceholder && hasFooter ? (
                        <div
                            className={styles.footer}
                            ref={footerRef}
                            style={{ padding: finalSpacing / 2 }}
                        >
                            <Footer {...footerProps} />
                        </div>
                    ) : null}
                </div>
            </Container>
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    muted={muted}
                    mediaRef={mediaRef}
                    playing={backgroundPlaying}
                    shouldLoad={mediaShouldLoad}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
}

export default SlideshowScreen;
