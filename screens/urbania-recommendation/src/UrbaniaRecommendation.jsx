/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    PlaceholderImage,
    PlaceholderText,
    PlaceholderTitle,
    ScreenElement,
    TransitionsStagger,
} from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerContext,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled, isHeaderFilled, isFooterFilled, getFooterProps } from '@micromag/core/utils';
import Background from '@micromag/element-background';
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
    visual: MicromagPropTypes.imageMedia,
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
    // animateBackground: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
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
    // animateBackground: true,
    transitions: null,
    transitionStagger: 100,
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
    // animateBackground,
    transitions,
    transitionStagger,
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

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    // const finalAnimateBackground =
    // current && animateBackground && !isPlaceholder && !isStatic && !isPreview && !isEdit;

    // const [animationStarted, setAnimationStarted] = useState(finalAnimateBackground);

    const hasVisual = visual !== null;
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

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });
    const [scrolledBottom, setScrolledBottom] = useState(false);

    // useEffect(() => {
    //     let id = null;
    //     if (animationStarted) {
    //         id = setTimeout(() => {
    //             setAnimationStarted(false);
    //         }, 3000);
    //     }
    //     return () => {
    //         clearTimeout(id);
    //     };
    // }, [animationStarted, finalAnimateBackground, setAnimationStarted]);

    // useEffect(() => {
    //     if (!isView) {
    //         setAnimationStarted(false);
    //     } else {
    //         setAnimationStarted(true);
    //     }
    // }, [isView, setAnimationStarted]);

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

    // const finalBackground = useMemo(
    //     () => ({
    //         fit: 'cover',
    //         // horizontalAlign: 'left',
    //         // verticalAlign: '-20%',
    //         repeat: true,
    //         ...background,
    //     }),
    //     [background],
    // );
    // Create elements
    const items = [
        !isPlaceholder && hasHeader ? (
            <div
                key="header"
                style={{
                    paddingBottom: spacing,
                }}
            >
                <Header {...header} />
            </div>
        ) : null,
        !isPlaceholder ? <Spacer key="spacer-cta-top" /> : null,
        hasTextCard || isPlaceholder || isEdit ? (
            <Container
                className={classNames([
                    styles.textCard,
                    {
                        [styles.isPlaceholder]: isPlaceholder,
                        // TODO: Add toggle for visual position
                        [styles.visualBottom]: false,
                        // [styles.appear]: finalAnimateBackground,
                    },
                ])}
            >
                <div className={styles.visualContainer}>
                    {/* // SPONSOR */}
                    <ScreenElement
                        key="sponsor"
                        placeholder={<PlaceholderText className={styles.sponsorPlaceholder} />}
                        // emptyLabel={
                        //     <FormattedMessage
                        //         defaultMessage="Sponsor"
                        //         description="Text placeholder"
                        //     />
                        // }
                        // emptyClassName={classNames([styles.empty, styles.emptySponsor])}
                        // isEmpty={!hasSponsor}
                    >
                        {hasSponsor ? <Text className={styles.sponsor} {...sponsor} /> : null}
                    </ScreenElement>
                    {/* @TODO: Create a new element that onClick expands to fill screen w/ player */}
                    <ScreenElement
                        key="visual"
                        placeholder={<PlaceholderImage className={styles.visualPlaceholder} />}
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Visual"
                                description="Text placeholder"
                            />
                        }
                        emptyClassName={classNames([styles.empty, styles.emptyVisual])}
                        isEmpty={!hasVisual}
                    >
                        {hasVisual ? (
                            <Visual className={styles.visual} media={visual} width="auto" />
                        ) : null}
                    </ScreenElement>
                </div>
                <div className={styles.text}>
                    {/* // CATEGORY */}
                    <ScreenElement
                        key="category"
                        placeholder={<PlaceholderTitle className={styles.categoryPlaceholder} />}
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Category"
                                description="Category placeholder"
                            />
                        }
                        emptyClassName={styles.emptyCategory}
                        isEmpty={!hasCategory}
                    >
                        {hasCategory ? <Heading className={styles.category} {...category} /> : null}
                    </ScreenElement>

                    <div
                        className={classNames([
                            styles.textContent,
                            {
                                [styles.isPlaceholder]: isPlaceholder,
                            },
                        ])}
                    >
                        {/* // TITLE */}
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
                        {/* // DATE */}
                        <ScreenElement
                            key="date"
                            placeholder={<PlaceholderText className={styles.datePlaceholder} />}
                        >
                            {hasDate ? (
                                <Text
                                    className={classNames([
                                        styles.date,
                                        {
                                            [styles.centerDate]: !hasTitle,
                                        },
                                    ])}
                                    {...date}
                                />
                            ) : null}
                        </ScreenElement>
                        {/* // LOCATION */}
                        <ScreenElement
                            key="location"
                            placeholder={<PlaceholderText className={styles.locationPlaceholder} />}
                        >
                            {hasLocation ? (
                                <Text className={styles.location} {...location} />
                            ) : null}
                        </ScreenElement>
                        {/* // DESCRIPTION */}
                        <ScreenElement
                            key="description"
                            placeholder={
                                <PlaceholderText className={styles.descriptionPlaceholder} />
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
                                <Text className={styles.description} {...description} />
                            ) : null}
                        </ScreenElement>
                    </div>
                </div>
            </Container>
        ) : null,
        !isPlaceholder ? <Spacer key="spacer-cta-bottom" /> : null,
        !isPlaceholder && hasFooter ? (
            <div
                key="call-to-action"
                className={classNames([
                    styles.callToAction,
                    {
                        [styles.disabled]: !scrolledBottom,
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
        ) : null,
    ].filter((el) => el !== null);

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
                    // disabled={animationStarted || scrollingDisabled}
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    verticalAlign="middle"
                    withShadow
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
                        <TransitionsStagger
                            transitions={transitions}
                            stagger={transitionStagger}
                            disabled={transitionDisabled}
                            playing={transitionPlaying}
                        >
                            {items}
                        </TransitionsStagger>
                    </Layout>
                </Scroll>
            </Container>
            {!isPlaceholder ? (
                <Background
                    // background={finalBackground}
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={mediaShouldLoad}
                    // backgroundClassName={finalAnimateBackground ? styles.background : null}
                    mediaRef={mediaRef}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

UrbaniaRecommendation.defaultProps = defaultProps;
UrbaniaRecommendation.propTypes = propTypes;

export default React.memo(UrbaniaRecommendation);
