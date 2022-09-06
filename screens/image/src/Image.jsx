/* eslint-disable no-nested-ternary */

/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenSize,
    useScreenRenderContext,
    useViewerContext,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useDimensionObserver } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './image.module.scss';

const propTypes = {
    layout: PropTypes.oneOf([
        'normal',
        'fullscreen',
        'reverse',
        'card',
        'card-reverse',
        'title-top',
    ]),
    image: MicromagPropTypes.imageMedia,
    imageFit: PropTypes.oneOf(['contain', 'cover']),
    defaultImageFit: PropTypes.string,
    title: MicromagPropTypes.headingElement,
    text: MicromagPropTypes.textElement,
    legend: MicromagPropTypes.textElement,
    withTitle: PropTypes.bool,
    withText: PropTypes.bool,
    withLegend: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    image: null,
    imageFit: null,
    defaultImageFit: 'cover',
    title: null,
    text: null,
    legend: null,
    withTitle: false,
    withText: false,
    withLegend: false,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    className: null,
};

const ImageScreen = ({
    layout,
    image,
    imageFit,
    defaultImageFit,
    title,
    text,
    legend,
    withTitle,
    withText,
    withLegend,
    spacing,
    background,
    callToAction,
    current,
    active,
    transitions,
    className,
}) => {
    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const hasImage = image !== null;
    const hasTitle = isTextFilled(title);
    const hasText = isTextFilled(text);
    const hasLegend = isTextFilled(legend);

    const [ready, setReady] = useState(!hasImage);
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const finalImageFit = useMemo(
        () => ({ fit: imageFit || defaultImageFit }),
        [imageFit, defaultImageFit],
    );

    const isReversed = layout === 'reverse' || layout === 'card-reverse';
    const isTitleTop = layout === 'title-top';
    const isCard = layout === 'card' || layout === 'card-reverse';
    const isCardReverse = layout === 'card-reverse';
    const isFullscreen = layout === 'fullscreen';

    const finalSpacing = !isFullscreen && !isPlaceholder ? spacing : 0;

    const { ref: imageCntRef, width: imageWidth, height: imageHeight } = useDimensionObserver();

    const cardImageMargin = isCardReverse
        ? `${finalSpacing / 2}px ${-finalSpacing / 2}px 0`
        : `0 ${-finalSpacing / 2}px ${finalSpacing / 2}px`;

    const imageMargin = isCard || isCardReverse ? cardImageMargin : finalSpacing / 2;

    const items = [
        <div
            key="image"
            ref={imageCntRef}
            className={styles.imageContainer}
            style={
                !isPlaceholder
                    ? {
                          margin: imageMargin,
                      }
                    : null
            }
        >
            <ScreenElement
                placeholder="image"
                placeholderProps={{ className: styles.placeholderImage, height: '100%' }}
                emptyLabel={
                    <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                }
                emptyClassName={styles.emptyImage}
                isEmpty={!hasImage}
            >
                {hasImage ? (
                    <Transitions
                        transitions={transitions}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                        fullscreen
                    >
                        <Visual
                            className={styles.image}
                            media={image}
                            objectFit={finalImageFit}
                            width={imageWidth}
                            height={imageHeight}
                            resolution={resolution}
                            playing={backgroundPlaying}
                            muted={muted}
                            active={active}
                            shouldLoad={mediaShouldLoad}
                            onLoaded={onImageLoaded}
                        />
                    </Transitions>
                ) : null}
            </ScreenElement>
        </div>,
        withTitle && (
            <ScreenElement
                key="title"
                placeholder="title"
                emptyLabel={
                    <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                }
                emptyClassName={styles.emptyTitle}
                isEmpty={!hasTitle}
            >
                {hasTitle ? (
                    <Transitions
                        transitions={transitions}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                    >
                        <div style={!isPlaceholder ? { margin: finalSpacing / 2 } : null}>
                            <Heading {...title} />
                        </div>
                    </Transitions>
                ) : null}
            </ScreenElement>
        ),

        withText && (
            <ScreenElement
                key="text"
                placeholder="text"
                emptyLabel={
                    <FormattedMessage defaultMessage="Text" description="Text placeholder" />
                }
                emptyClassName={styles.emptyText}
                isEmpty={!hasText}
            >
                {hasText ? (
                    <Transitions
                        transitions={transitions}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                    >
                        <div style={!isPlaceholder ? { margin: finalSpacing / 2 } : null}>
                            <Text {...text} />
                        </div>
                    </Transitions>
                ) : null}
            </ScreenElement>
        ),

        withLegend && (
            <ScreenElement
                key="legend"
                placeholder="shortText"
                emptyLabel={
                    <FormattedMessage defaultMessage="Legend" description="Legend placeholder" />
                }
                emptyClassName={styles.emptyLegend}
                isEmpty={!hasLegend}
            >
                {hasLegend ? (
                    <Transitions
                        transitions={transitions}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                    >
                        <div style={!isPlaceholder ? { margin: finalSpacing / 2 } : null}>
                            <Text {...legend} />
                        </div>
                    </Transitions>
                ) : null}
            </ScreenElement>
        ),
    ];

    if (isReversed) {
        items.reverse();
    } else if (isTitleTop) {
        if (withTitle && (hasTitle || isPlaceholder)) {
            items.splice(0, 0, items.splice(1, 1)[0]);
        }
    }

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    if (!isPlaceholder && hasCallToAction) {
        items.push(
            <div
                className={styles.callToAction}
                style={
                    isFullscreen || isCardReverse
                        ? {
                              paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                              paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                              paddingTop: spacing / 2,
                              paddingBottom: spacing / 2,
                              transform: !isPreview
                                  ? `translate(0, -${viewerBottomHeight}px)`
                                  : null,
                          }
                        : {
                              paddingLeft: Math.max(viewerBottomSidesWidth - spacing, 0),
                              paddingRight: Math.max(viewerBottomSidesWidth - spacing, 0),
                              paddingTop: isCard ? spacing / 2 : null,
                              paddingBottom: isCard ? spacing / 2 : null,
                          }
                }
                key="call-to-action"
            >
                <CallToAction
                    {...callToAction}
                    animationDisabled={isPreview}
                    focusable={current && isView}
                    openWebView={openWebView}
                />
            </div>,
        );
    }

    let paddingBottom = (current && !isPreview ? viewerBottomHeight : 0) + finalSpacing / 2;
    let paddingTop = (current && !isPreview ? viewerTopHeight : 0) + finalSpacing / 2;

    if (isCard || isFullscreen) {
        paddingTop = 0;
        paddingBottom = 0;
    }

    if (isCardReverse) {
        paddingTop = current && !isPreview ? viewerTopHeight : 0;
        paddingBottom = current && !isPreview ? viewerBottomHeight : 0;
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isReversed]: isReversed,
                    [styles.isPlaceholder]: isPlaceholder,
                    [styles.isCard]: isCard,
                    [styles.isCardReverse]: isCardReverse,
                    [styles.isFullscreen]: isFullscreen,
                },
            ])}
            data-screen-ready={ready}
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
                />
            ) : null}
            <Container width={width} height={height}>
                <Layout
                    className={styles.layout}
                    fullscreen
                    style={
                        !isPlaceholder
                            ? {
                                  padding: finalSpacing / 2,
                                  paddingTop,
                                  paddingBottom,
                              }
                            : null
                    }
                >
                    {items}
                </Layout>
            </Container>
        </div>
    );
};

ImageScreen.propTypes = propTypes;
ImageScreen.defaultProps = defaultProps;

export default React.memo(ImageScreen);
