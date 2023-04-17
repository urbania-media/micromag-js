/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerContext,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { useDimensionObserver, useTrackScreenEvent } from '@micromag/core/hooks';
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
import Header from '@micromag/element-header';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './gallery-feed.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal', 'reverse']),
    images: PropTypes.oneOfType([
        MicromagPropTypes.imageElementsWithCaption,
        MicromagPropTypes.imageMedias,
    ]),
    withCaptions: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    current: PropTypes.bool,
    active: PropTypes.bool,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    images: null,
    withCaptions: false,
    spacing: 20,
    background: null,
    header: null,
    footer: null,
    current: true,
    active: true,
    type: null,
    className: null,
};

const GalleryFeedScreen = ({
    layout,
    images,
    withCaptions,
    spacing,
    background,
    header,
    footer,
    current,
    active,
    type,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent(type);
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
                    <div
                        className={styles.caption}
                        style={{
                            marginTop,
                            marginBottom,
                        }}
                    >
                        <Text {...caption} className={styles.captionText} />
                    </div>
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
                <Scroll
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                >
                    <Layout
                        className={styles.layout}
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
};

GalleryFeedScreen.propTypes = propTypes;
GalleryFeedScreen.defaultProps = defaultProps;

export default React.memo(GalleryFeedScreen);
