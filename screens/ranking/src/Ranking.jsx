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
import { useTrackScreenEvent, useDimensionObserver } from '@micromag/core/hooks';
import { isTextFilled, isHeaderFilled, isFooterFilled, getFooterProps } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';

import styles from './ranking.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['side', 'over']),
    title: MicromagPropTypes.headingElement,
    items: PropTypes.arrayOf(MicromagPropTypes.textElement),
    numbersStyle: MicromagPropTypes.textStyle,
    ascending: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    current: PropTypes.bool,
    preload: PropTypes.bool,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'side',
    title: null,
    items: [null],
    numbersStyle: null,
    ascending: false,
    spacing: 20,
    background: null,
    header: null,
    footer: null,
    current: true,
    preload: true,
    type: null,
    className: null,
};

const RankingScreen = ({
    layout,
    title,
    items,
    numbersStyle,
    ascending,
    spacing,
    background,
    header,
    footer,
    current,
    preload,
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

    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || preload;

    const hasTitle = isTextFilled(title);

    const titleElement = (
        <ScreenElement
            placeholder="Title"
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Placeholder label" />}
            emptyClassName={classNames([styles.empty, styles.emptyTitle])}
            isEmpty={!hasTitle}
        >
            {hasTitle ? (
                <Heading
                    className={styles.title}
                    {...title}
                    // textStyle={titleTextStyle}
                />
            ) : null}
        </ScreenElement>
    );

    const elements = (finalItems || []).map((item, itemI) => {
        const { title: itemTitle = null, description = null } = item || {};

        const hasItemTitle = isTextFilled(itemTitle);
        const hasDescription = isTextFilled(description);

        const itemTitleElement = (
            <div className={styles.itemTitle}>
                <ScreenElement
                    placeholder="title"
                    emptyLabel={
                        <FormattedMessage
                            defaultMessage="Entry Title"
                            description="Title placeholder"
                        />
                    }
                    emptyClassName={styles.empty}
                    isEmpty={!hasItemTitle}
                >
                    {hasItemTitle ? <Heading {...itemTitle} /> : null}
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
                    {hasDescription ? <Text {...description} /> : null}
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
                        <Text
                            className={styles.rankText}
                            body={rankText}
                            textStyle={numbersStyle}
                        />
                    )}
                </div>
                <div className={styles.label}>
                    {itemTitleElement}
                    {descriptionElement}
                </div>
            </div>
        );
    });

    // Call to Action

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const [scrolledBottom, setScrolledBottom] = useState(false);
    const { ref: footerRef, height: foterHeight = 0 } = useDimensionObserver();

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
            <Container width={width} height={height} className={styles.content}>
                <Scroll
                    className={styles.scroll}
                    verticalAlign="middle"
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    withShadow
                >
                    {!isPlaceholder && hasHeader ? (
                        <div
                            style={{
                                paddingTop: spacing / 2 + viewerTopHeight,
                                paddingLeft: spacing,
                                paddingRight: spacing,
                            }}
                        >
                            <Header {...header} />
                        </div>
                    ) : null}
                    <Layout
                        className={styles.layout}
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                      paddingTop:
                                          !isPlaceholder && hasHeader
                                              ? spacing
                                              : (!isPreview ? viewerTopHeight : 0) + spacing,
                                      paddingBottom:
                                          (current && !isPreview ? viewerBottomHeight : 0) +
                                          (foterHeight || spacing),
                                  }
                                : null
                        }
                    >
                        {titleElement}
                        <div className={styles.elementsContainer}>{elements}</div>
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

RankingScreen.propTypes = propTypes;
RankingScreen.defaultProps = defaultProps;

export default RankingScreen;
