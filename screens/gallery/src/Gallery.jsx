/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import isPlainObject from 'lodash/isPlainObject';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import {
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { useDimensionObserver } from '@micromag/core/hooks';
import {
    isImageFilled,
    isTextFilled,
    isHeaderFilled,
    isFooterFilled,
    getFooterProps,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Grid from '@micromag/element-grid';
import Header from '@micromag/element-header';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import layoutProps from './layouts';

import styles from './gallery.module.scss';

const propTypes = {
    layout: PropTypes.oneOf([
        // 2
        'two-vertical-equal',
        'two-vertical-top',
        'two-vertical-bottom',
        // 3
        'three-vertical',
        'one-two',
        'two-one',
        // 4
        'two-by-two',
        'four-vertical',
        'one-two-one',
        'four-mosaic',
        // 5
        'two-one-two',
        'one-two-two',
        'two-two-one',
        // 6
        'two-by-three',
        'one-one-two-two',
        'two-two-one-one',
    ]),
    images: PropTypes.oneOfType([MicromagPropTypes.imageMedias, MicromagPropTypes.imageElements]),
    withCaptions: PropTypes.bool,
    spacing: PropTypes.number,
    captionMaxLines: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'four-mosaic',
    withCaptions: false,
    images: [],
    spacing: 20,
    captionMaxLines: 2,
    background: null,
    header: null,
    footer: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 50,
    className: null,
};

const GalleryScreen = ({
    layout,
    images,
    withCaptions,
    background,
    header,
    footer,
    current,
    active,
    spacing,
    captionMaxLines,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height, resolution } = useScreenSize();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

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
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

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

    // Call to Action
    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });
    const { ref: callToActionRef, height: callToActionHeight = 0 } = useDimensionObserver();

    // items
    const items = [...Array(gridSpaces)].map((item, itemI) => {
        const image = images !== null ? images[itemI] : null;
        const imageSize = imagesSizes[itemI] || {};

        const finalImage = withCaptions ? image : { media: image };

        const { caption = null } = finalImage || {};

        const hasImage = isImageFilled(finalImage);
        const hasCaption = isTextFilled(caption);

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
                        delay={itemI * transitionStagger}
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
                            {active || current ? (
                                <Visual
                                    className={styles.image}
                                    {...finalImage}
                                    {...imageSize}
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
                    </Transitions>
                </div>
                {withCaptions ? (
                    <Transitions
                        transitions={transitions}
                        delay={itemI * transitionStagger}
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
                            <div className={styles.caption}>
                                <Text
                                    {...caption}
                                    className={styles.captionText}
                                    lineClamp={captionMaxLines}
                                />
                            </div>
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
                            (hasFooter ? callToActionHeight : 0) +
                            (current && !isPreview ? viewerBottomHeight : 0),
                    }}
                    ref={contentRef}
                >
                    {!isPlaceholder && hasHeader ? (
                        <div
                            key="header"
                            style={{
                                paddingTop: finalSpacing / 2,
                                transform: !isPreview ? `translate(0, ${viewerTopHeight}px)` : null,
                            }}
                        >
                            <Header {...header} />
                        </div>
                    ) : null}
                    <Grid className={styles.grid} spacing={finalSpacing} items={items} {...grid} />
                    {!isPlaceholder && hasFooter ? (
                        <div
                            className={styles.callToAction}
                            ref={callToActionRef}
                            style={{
                                paddingLeft: Math.max(finalSpacing / 2, viewerBottomSidesWidth),
                                paddingRight: Math.max(finalSpacing / 2, viewerBottomSidesWidth),
                                paddingTop: finalSpacing / 2,
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
                    mediaRef={mediaRef}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

GalleryScreen.propTypes = propTypes;
GalleryScreen.defaultProps = defaultProps;

export default React.memo(GalleryScreen);
