/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerContext,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { useTrackScreenEvent, useDimensionObserver } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';

import styles from './ranking.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['side', 'over']),
    items: PropTypes.arrayOf(MicromagPropTypes.textElement),
    numbersStyle: MicromagPropTypes.textStyle,
    ascending: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'side',
    items: [null],
    numbersStyle: null,
    ascending: false,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 75,
    type: null,
    className: null,
};

const RankingScreen = ({
    layout,
    items,
    numbersStyle,
    ascending,
    spacing,
    background,
    callToAction,
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

    const finalItems = isPlaceholder ? [...new Array(10)].map(() => ({})) : items || [null];

    const itemsCount = finalItems !== null ? finalItems.length : 0;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    const elements = (finalItems || []).map((item, itemI) => {
        const { title = null, description = null } = item || {};

        const hasTitle = isTextFilled(title);
        const hasDescription = isTextFilled(description);

        const titleElement = (
            <div className={styles.title}>
                <ScreenElement
                    placeholder="title"
                    emptyLabel={
                        <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                    }
                    emptyClassName={styles.empty}
                    isEmpty={!hasTitle}
                >
                    {hasTitle ? (
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            delay={transitionStagger * itemI}
                            disabled={transitionDisabled}
                        >
                            <Heading {...title} />
                        </Transitions>
                    ) : null}
                </ScreenElement>
            </div>
        );

        const descriptionElement = (
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
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            delay={transitionStagger * itemI}
                            disabled={transitionDisabled}
                        >
                            <Text {...description} />
                        </Transitions>
                    ) : null}
                </ScreenElement>
            </div>
        );

        const rankText = `${ascending ? itemI + 1 : itemsCount - itemI}`;

        return (
            <div className={styles.item} key={`item-${itemI}`}>
                <div className={styles.rank}>
                    {isPlaceholder ? (
                        rankText
                    ) : (
                        <Transitions
                            transitions={transitions}
                            playing={transitionPlaying}
                            delay={transitionStagger * itemI}
                            disabled={transitionDisabled}
                        >
                            <Text
                                className={styles.rankText}
                                body={rankText}
                                textStyle={numbersStyle}
                            />
                        </Transitions>
                    )}
                </div>
                <div className={styles.content}>
                    {titleElement}
                    {descriptionElement}
                </div>
            </div>
        );
    });

    // Call to Action

    const { active: hasCallToAction = false } = callToAction || {};
    const [scrolledBottom, setScrolledBottom] = useState(false);
    const { ref: callToActionRef, height: callToActionHeight = 0 } = useDimensionObserver();

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
                    [styles[`${layout}Layout`]]: layout !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
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
                <Scroll
                    className={styles.scroll}
                    verticalAlign="middle"
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
                                          (!isPreview ? viewerBottomHeight : 0) +
                                          (callToActionHeight || spacing),
                                  }
                                : null
                        }
                    >
                        {elements}
                    </Layout>
                </Scroll>
                {!isPlaceholder && hasCallToAction ? (
                    <div
                        ref={callToActionRef}
                        className={classNames([
                            styles.callToAction,
                            {
                                [styles.disabled]: !scrolledBottom,
                            },
                        ])}
                        style={{
                            transform: !isPreview ? `translate(0, -${viewerBottomHeight}px)` : null,
                            paddingLeft: Math.max(spacing / 2, viewerBottomSidesWidth),
                            paddingRight: Math.max(spacing / 2, viewerBottomSidesWidth),
                            paddingTop: spacing / 2,
                            paddingBottom: spacing / 2,
                        }}
                    >
                        <CallToAction
                            {...callToAction}
                            animationDisabled={isPreview}
                            focusable={current && isView}
                            openWebView={openWebView}
                        />
                    </div>
                ) : null}
            </Container>
        </div>
    );
};

RankingScreen.propTypes = propTypes;
RankingScreen.defaultProps = defaultProps;

export default RankingScreen;
