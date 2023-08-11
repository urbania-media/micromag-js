/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo, useCallback, useEffect, useRef, useState } from 'react';
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
import { useDimensionObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import {
    getStyleFromColor,
    isTextFilled,
    isHeaderFilled,
    isFooterFilled,
    getFooterProps,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './timeline.module.scss';

const propTypes = {
    layout: PropTypes.oneOf([
        'normal',
        'title-description-image',
        'title-image-description',
        'image-title-description',
    ]),
    items: PropTypes.arrayOf(MicromagPropTypes.textElement),
    bulletColor: MicromagPropTypes.color,
    lineColor: MicromagPropTypes.color,
    bulletShape: PropTypes.oneOf(['circle', 'square']),
    bulletFilled: PropTypes.bool,
    illustrated: PropTypes.bool,
    spacing: PropTypes.number,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    items: [null],
    bulletColor: null,
    lineColor: null,
    bulletShape: 'circle',
    bulletFilled: true,
    illustrated: false,
    spacing: 20,
    header: null,
    footer: null,
    background: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 75,
    type: null,
    className: null,
};

const Timeline = ({
    layout,
    items,
    bulletColor,
    lineColor,
    bulletShape,
    bulletFilled,
    illustrated,
    spacing,
    header,
    footer,
    background,
    current,
    active,
    transitions,
    transitionStagger,
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
    const finalItems = useMemo(
        () => (isPlaceholder ? [...new Array(5)].map(() => ({})) : items || [null]),
        [isPlaceholder, items],
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
    const ready = imagesLoaded >= imagesCount;
    const transitionsPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded((count) => count + 1);
    }, [setImagesLoaded]);

    const firstLineRef = useRef(null);
    const firstContentRef = useRef(null);
    const [imageWidth, setImageWidth] = useState(0);

    useEffect(() => {
        setImageWidth(firstContentRef.current.offsetWidth - firstLineRef.current.offsetWidth);
    }, [width, height]);

    const timelineElements = (finalItems || []).map((item, itemI) => {
        const { title = null, description = null, image = null } = item || {};

        const hasTitle = isTextFilled(title);
        const hasDescription = isTextFilled(description);
        const hasImage = image !== null;

        const elementsTypes = (layout === 'normal' ? 'title-description-image' : layout).split('-');

        const titleIndex = elementsTypes.indexOf('title');
        const imageIndex = elementsTypes.indexOf('image');

        if (!illustrated) {
            elementsTypes.splice(imageIndex, 1);
        }

        const typesCount = elementsTypes.length;
        const { textStyle: descriptionTextStyle } = description || {};

        return (
            <div className={styles.item} key={`item-${itemI}`}>
                <Transitions
                    transitions={transitions}
                    playing={transitionsPlaying}
                    delay={transitionStagger * itemI}
                    disabled={transitionDisabled}
                >
                    {elementsTypes.map((elementType, typeI) => {
                        let hasElement = false;
                        let elementContent;
                        switch (elementType) {
                            case 'title':
                                hasElement = hasTitle;
                                elementContent = (
                                    <div className={styles.title}>
                                        <ScreenElement
                                            placeholder="title"
                                            emptyLabel={
                                                <FormattedMessage
                                                    defaultMessage="Title"
                                                    description="Title placeholder"
                                                />
                                            }
                                            emptyClassName={styles.empty}
                                            isEmpty={!hasTitle}
                                        >
                                            {hasElement ? <Heading {...title} /> : null}
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
                                            {hasElement ? (
                                                <Visual
                                                    className={styles.image}
                                                    videoClassName={styles.video}
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
                            default:
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
                                            {hasElement ? (
                                                <Text
                                                    {...description}
                                                    textStyle={{ ...descriptionTextStyle }}
                                                />
                                            ) : null}
                                        </ScreenElement>
                                    </div>
                                );
                                break;
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
                                ])}
                                ref={itemI === 0 ? firstContentRef : null}
                            >
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
                                <div
                                    className={classNames([
                                        styles.body,
                                        { [styles.last]: lastType && !lastItem },
                                    ])}
                                >
                                    {elementContent}
                                </div>
                            </div>
                        );
                    })}
                </Transitions>
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

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
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
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                >
                    <Layout
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
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

Timeline.propTypes = propTypes;
Timeline.defaultProps = defaultProps;

export default Timeline;
