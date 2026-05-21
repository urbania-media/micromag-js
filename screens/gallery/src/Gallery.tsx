import classNames from 'classnames';
import isPlainObject from 'lodash/isPlainObject';
import React, { ForwardedRef, useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type {
    BackgroundElement,
    Footer as FooterConfig,
    Header as HeaderConfig,
    ImageElement,
    ImageMedia,
    MediaElement,
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
import { useDimensionObserver } from '@micromag/core/hooks';
import {
    getFooterProps,
    isFooterFilled,
    isHeaderFilled,
    isImageFilled,
    isTextFilled,
    mergeRefs,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Grid from '@micromag/element-grid';
import Header from '@micromag/element-header';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import layoutProps from './layouts';

import styles from './gallery.module.css';

const emptyArray: never[] = [];

interface GalleryScreenProps {
    layout?:
        | 'two-vertical-equal'
        | 'two-vertical-top'
        | 'two-vertical-bottom'
        | 'three-vertical'
        | 'one-two'
        | 'two-one'
        | 'two-by-two'
        | 'four-vertical'
        | 'one-two-one'
        | 'four-mosaic'
        | 'two-one-two'
        | 'one-two-two'
        | 'two-two-one'
        | 'two-by-three'
        | 'one-one-two-two'
        | 'two-two-one-one';
    images?: ImageMedia[] | ImageElement[];
    withCaptions?: boolean;
    imageCaptionStyle?: TextStyle | null;
    spacing?: number;
    captionMaxLines?: number;
    background?: BackgroundElement | null;
    header?: HeaderConfig | null;
    footer?: FooterConfig | null;
    current?: boolean;
    active?: boolean;
    preload?: boolean;
    mediaRef?: ForwardedRef<MediaElement> | null;
    className?: string | null;
}

function GalleryScreen({
    layout = 'four-mosaic',
    images = emptyArray,
    withCaptions = false,
    imageCaptionStyle = null,
    background = null,
    header = null,
    footer = null,
    current = true,
    active = true,
    preload = true,
    spacing: initialSpacing = 20,
    captionMaxLines = 2,
    mediaRef: customMediaRef = null,
    className = null,
}: GalleryScreenProps) {
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

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const mediaShouldLoad = current || preload;

    const finalSpacing = isPlaceholder ? 5 : spacing;

    const grid = isPlainObject(layoutProps[layout]) ? layoutProps[layout] : {};
    const { layout: gridLayout = [], vertical = false } = grid;

    const gridSpaces = gridLayout.reduce(
        (acc, { rows, columns }) => acc + (vertical ? rows : columns).length,
        0,
    );

    const [imagesLoaded, setImagesLoaded] = useState(0);
    const imagesCount = images !== null ? Math.min(gridSpaces, images.length) : 0;
    const ready = imagesLoaded >= imagesCount;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded((count) => count + 1);
    }, [setImagesLoaded]);

    const imagesEl = useRef([]);
    const [imagesSizes, setImagesSizes] = useState([]);

    const {
        ref: contentRef,
        width: contentWidth = null,
        height: contentHeight = null,
    } = useDimensionObserver();

    useEffect(() => {
        if (imagesEl.current.length) {
            setImagesSizes(
                imagesEl.current.map((imageEl) =>
                    imageEl !== null
                        ? {
                              width: imageEl.offsetWidth,
                              height: imageEl.offsetHeight,
                          }
                        : {},
                ),
            );
        }
    }, [contentWidth, contentHeight, layout, setImagesSizes]);

    // header + footer
    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });
    const { ref: headerRef, height: headerHeight = 0 } = useDimensionObserver();
    const { ref: footerRef, height: footerHeight = 0 } = useDimensionObserver();

    // items
    const items = [...Array(gridSpaces)].map((item, itemI) => {
        const image = images !== null ? images[itemI] : null;
        const imageSize = imagesSizes[itemI] || {};

        const finalImage = withCaptions ? image : { media: image };

        const { caption = null } = finalImage || {};

        const hasImage = isImageFilled(finalImage);
        const hasCaption = isTextFilled(caption);

        const { textStyle = null } = caption || {};

        return (
            <div key={`item-${itemI}`} className={styles.gridItem}>
                <div
                    className={styles.imageContainer}
                    ref={(el) => {
                        imagesEl.current[itemI] = el;
                    }}
                >
                    <ScreenElement
                        placeholder="image"
                        placeholderProps={{
                            // className: styles.placeholder,
                            width: '70%',
                            height: '70%',
                        }}
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Image"
                                description="Image placeholder"
                            />
                        }
                        emptyClassName={styles.emptyImage}
                        placeholderClassName="position-absolute top-50 start-50 translate-middle w-100"
                        isEmpty={!hasImage}
                    >
                        {active || current ? (
                            <Visual
                                className={styles.image}
                                {...finalImage}
                                {...imageSize}
                                loadingMode="lazy"
                                resolution={resolution}
                                objectFit={{ fit: 'cover' }}
                                playing={backgroundPlaying}
                                active={active}
                                shouldLoad={mediaShouldLoad}
                                withoutVideo={isPreview}
                                onLoaded={onImageLoaded}
                            />
                        ) : null}
                    </ScreenElement>
                </div>
                {withCaptions ? (
                    <ScreenElement
                        placeholder="text"
                        placeholderProps={{
                            lines: 1,
                        }}
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Caption"
                                description="Caption placeholder"
                            />
                        }
                        emptyClassName={styles.emptyCaption}
                        isEmpty={!hasCaption}
                    >
                        <div className={styles.caption}>
                            <Text
                                {...caption}
                                className={styles.captionText}
                                lineClamp={captionMaxLines}
                                textStyle={{
                                    ...(imageCaptionStyle || null),
                                    ...textStyle,
                                }}
                            />
                        </div>
                    </ScreenElement>
                ) : null}
            </div>
        );
    });

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
                <div
                    className={styles.inner}
                    style={{
                        paddingTop:
                            (hasHeader ? headerHeight : 0) + (!isPreview ? viewerTopHeight : 0),
                        paddingBottom:
                            (hasFooter ? footerHeight : 0) +
                            (current && !isPreview ? viewerBottomHeight : 0),
                    }}
                    ref={contentRef}
                >
                    {!isPlaceholder && hasHeader ? (
                        <div
                            className={styles.header}
                            ref={headerRef}
                            style={{
                                paddingTop: hasHeader ? finalSpacing / 2 : spacing,
                                paddingLeft: spacing,
                                paddingRight: spacing,
                                transform: !isPreview ? `translate(0, ${viewerTopHeight}px)` : null,
                            }}
                        >
                            <Header {...header} />
                        </div>
                    ) : null}
                    <Grid className={styles.grid} spacing={finalSpacing} items={items} {...grid} />
                    {!isPlaceholder && hasFooter ? (
                        <div
                            className={styles.footer}
                            ref={footerRef}
                            style={{
                                paddingLeft: Math.max(finalSpacing / 2, viewerBottomSidesWidth),
                                paddingRight: Math.max(finalSpacing / 2, viewerBottomSidesWidth),
                                // paddingTop: finalSpacing / 2,
                                paddingBottom: finalSpacing / 2,
                                transform: !isPreview
                                    ? `translate(0, -${viewerBottomHeight}px)`
                                    : null,
                            }}
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
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    mediaRef={mergeRefs(mediaRef, customMediaRef)}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
}

export default GalleryScreen;
