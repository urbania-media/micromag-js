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
    useViewerWebView,
    useViewerInteraction,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { useTrackScreenEvent, useResizeObserver } from '@micromag/core/hooks';
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
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic } = useScreenRenderContext();

    const animateBackground = current && !isPlaceholder && !isStatic && !isPreview && !isEdit;

    const [animationStarted, setAnimationStarted] = useState(animateBackground);
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
        entry: { contentRect: visualWrapperRect = null },
    } = useResizeObserver();
    const { width: visualWrapperWidth = 0, height: visualWrapperHeight = 0 } =
        visualWrapperRect || {};

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

    useEffect(() => {
        let id = null;
        if (animationStarted) {
            id = setTimeout(() => {
                setAnimationStarted(false);
                setDidAnimate(true);
            }, 1600);
        }
        return () => {
            clearTimeout(id);
        };
    }, [animationStarted, animateBackground, setDidAnimate, setAnimationStarted]);

    useEffect(() => {
        if (isView && !isStatic && current) {
            setAnimationStarted(true);
        } else {
            setAnimationStarted(false);
        }
    }, [isView, current, setAnimationStarted]);

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

    const onClickVisual = useCallback(() => {
        if (!visualModalOpened) setVisualModalOpened(true);
    }, [setVisualModalOpened]);

    const onCloseModal = useCallback(() => {
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

    // Create elements

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
                    disabled={animationStarted || scrollingDisabled}
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
                                    // { [styles.appear]: animationStarted },
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
                                        [styles.appear]: animationStarted,
                                    },
                                ])}
                            >
                                <div
                                    className={classNames([
                                        styles.visualContainer,
                                        { [styles.modalOpened]: visualModalOpened },
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
                                                    { [styles.modalOpened]: visualModalOpened },
                                                ])}
                                                style={
                                                    visualModalOpened
                                                        ? { width, height }
                                                        : {
                                                              width: textContainerWidth,
                                                              height: 'auto',
                                                          }
                                                }
                                            >
                                                <Button
                                                    className={styles.visualButton}
                                                    onClick={onClickVisual}
                                                    disabled={visualModalOpened}
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
                                            <Visual
                                                media={image}
                                                width={width * 0.9}
                                                height={250}
                                                resolution={resolution}
                                                objectFit={{ fit: 'cover' }}
                                                shouldLoad={mediaShouldLoad}
                                                muted
                                                withoutVideo={isPreview}
                                                autoPlay
                                            />
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
                                                {' '}
                                                <Heading
                                                    className={styles.category}
                                                    {...category}
                                                />{' '}
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
                        playing={backgroundPlaying}
                        muted={muted}
                        shouldLoad={mediaShouldLoad}
                        mediaRef={mediaRef}
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
                                        [styles.didAnimate]: didAnimate, // @TODO: optimise — use animation-fill-mode?
                                        [styles.animateFromBottom]: animationStarted && i % 2 !== 0,
                                        [styles.animateFromTop]: animationStarted && i % 2 === 0,
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
