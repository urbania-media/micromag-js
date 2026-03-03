/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type {
    BackgroundElement,
    BoxStyle,
    Footer as FooterConfig,
    Header as HeaderConfig,
    HeadingElement,
    Label,
    TextElement,
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
import {
    getFooterProps,
    getStyleFromBox,
    isFooterFilled,
    isHeaderFilled,
    isTextFilled,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';

import styles from './title.module.css';

interface TitleScreenProps {
    layout?: 'top' | 'middle' | 'bottom' | 'split' | 'split-top' | 'split-bottom';
    title?: HeadingElement | null;
    subtitle?: HeadingElement | null;
    description?: TextElement | null;
    boxStyle?: BoxStyle | null;
    withSubtitle?: boolean;
    withDescription?: boolean;
    withBox?: boolean;
    spacing?: number;
    descriptionEmptyLabel?: Label;
    header?: HeaderConfig | null;
    footer?: FooterConfig | null;
    background?: BackgroundElement | null;
    current?: boolean;
    active?: boolean;
    transitionStagger?: number;
    className?: string | null;
}

function TitleScreen({
    layout = 'top',
    title = null,
    subtitle = null,
    description = null,
    boxStyle = null,
    withSubtitle = false,
    withDescription = false,

    // eslint-disable-line
    withBox = false,

    spacing = 20,

    descriptionEmptyLabel = (
        <FormattedMessage defaultMessage="Description" description="Description placeholder" />
    ),

    header = null,
    footer = null,
    background = null,
    current = true,
    active = true,
    className = null,
}: TitleScreenProps) {
    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(current, true);

    const hasTitle = isTextFilled(title);
    const hasSubtitle = isTextFilled(subtitle);
    const hasDescription = isTextFilled(description);

    const layoutParts = layout.split('-');
    const isSplitted = layoutParts[0] === 'split';
    const isTopLayout = layout === 'top';
    const isMiddleLayout = layout === 'middle';
    const isBottomLayout = layout === 'bottom';
    const verticalAlign = isSplitted ? layoutParts[1] || null : layoutParts[0];

    const titleWithMargin =
        hasTitle && (hasSubtitle || hasDescription) && (!isSplitted || verticalAlign === 'top');
    const subtitleWithMargin =
        hasSubtitle && hasDescription && (!isSplitted || verticalAlign === 'bottom');

    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const backgroundShouldLoad = current || active;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const titleElement = (
        <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Title placeholder" />}
            emptyClassName={styles.emptyTitle}
            isEmpty={!hasTitle}
        >
            {hasTitle ? (
                <Heading
                    className={classNames([styles.title, { [styles.withMargin]: titleWithMargin }])}
                    {...title}
                    size={1}
                />
            ) : null}
        </ScreenElement>
    );

    const subtitleElement = withSubtitle ? (
        <ScreenElement
            key="subtitle"
            placeholder="subtitle"
            emptyLabel={
                <FormattedMessage defaultMessage="Subtitle" description="Subtitle placeholder" />
            }
            emptyClassName={styles.emptySubtitle}
            isEmpty={!hasSubtitle}
        >
            {hasSubtitle ? (
                <Heading
                    className={classNames([
                        styles.subtitle,
                        { [styles.withMargin]: subtitleWithMargin },
                    ])}
                    {...subtitle}
                    size={2}
                />
            ) : null}
        </ScreenElement>
    ) : null;

    const descriptionElement = withDescription ? (
        <ScreenElement
            key="description"
            placeholder="shortText"
            emptyLabel={descriptionEmptyLabel}
            emptyClassName={styles.emptyDescription}
            isEmpty={!hasDescription}
        >
            {hasDescription ? <Text {...description} /> : null}
        </ScreenElement>
    ) : null;

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
                <Layout
                    className={styles.layout}
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (!isPreview ? viewerTopHeight : 0) +
                                      (hasHeader ? spacing / 2 : spacing),
                                  paddingBottom:
                                      (current && !isPreview ? viewerBottomHeight : 0) +
                                      (hasFooter ? spacing / 2 : spacing),
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

                    {!isPlaceholder && hasFooter && isMiddleLayout ? (
                        <Spacer key="spacer-cta-top" />
                    ) : null}

                    {!isPlaceholder && hasHeader && isBottomLayout ? (
                        <Spacer key="spacer-cta-top" />
                    ) : null}

                    {!isPlaceholder && hasHeader && !hasFooter && isMiddleLayout ? (
                        <Spacer key="spacer-cta-top" />
                    ) : null}

                    {withBox && !isSplitted ? (
                        <div
                            className={styles.box}
                            style={
                                isEdit || isPlaceholder || hasTitle || hasSubtitle || hasDescription
                                    ? getStyleFromBox(boxStyle)
                                    : null
                            }
                        >
                            {[titleElement, subtitleElement, descriptionElement]}
                        </div>
                    ) : null}

                    {withBox && isSplitted ? (
                        <>
                            <div
                                className={styles.box}
                                key="top"
                                style={
                                    isEdit ||
                                    isPlaceholder ||
                                    hasTitle ||
                                    (withDescription && verticalAlign === 'top' && hasSubtitle)
                                        ? getStyleFromBox(boxStyle)
                                        : null
                                }
                            >
                                {titleElement}
                                {withDescription && verticalAlign === 'top'
                                    ? subtitleElement
                                    : null}
                            </div>
                            <Spacer key="spacer1" />
                            <div
                                className={styles.box}
                                key="bottom"
                                style={
                                    isEdit ||
                                    isPlaceholder ||
                                    hasDescription ||
                                    ((!withDescription || verticalAlign === 'bottom') &&
                                        hasSubtitle)
                                        ? getStyleFromBox(boxStyle)
                                        : null
                                }
                            >
                                {!withDescription || verticalAlign === 'bottom'
                                    ? subtitleElement
                                    : null}
                                {descriptionElement}
                            </div>
                        </>
                    ) : null}

                    {!withBox ? (
                        <>
                            {titleElement}
                            {isSplitted && (!withDescription || verticalAlign === 'bottom') && (
                                <Spacer key="spacer1" />
                            )}
                            {subtitleElement}
                            {isSplitted && withDescription && verticalAlign === 'top' && (
                                <Spacer key="spacer2" />
                            )}
                            {descriptionElement}
                        </>
                    ) : null}

                    {!isPlaceholder && hasFooter && (isTopLayout || isMiddleLayout) ? (
                        <Spacer key="spacer-cta-bottom" />
                    ) : null}

                    {!isPlaceholder && hasHeader && !hasFooter && isMiddleLayout ? (
                        <Spacer key="spacer-cta-bottom" />
                    ) : null}

                    {!isPlaceholder && hasFooter ? (
                        <div
                            key="call-to-action"
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
            </Container>
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={backgroundShouldLoad}
                    mediaRef={mediaRef}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
}

export default TitleScreen;
