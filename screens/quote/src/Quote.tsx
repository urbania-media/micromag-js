import classNames from 'classnames';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import type {
    BackgroundElement,
    Footer as FooterConfig,
    Header as HeaderConfig,
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
import { getFooterProps, isFooterFilled, isHeaderFilled, isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Layout, { Spacer } from '@micromag/element-layout';
import Quote from '@micromag/element-quote';
import Text from '@micromag/element-text';

import styles from './quote.module.css';

// NOTE: this might be better with a scroll

interface QuoteScreenProps {
    layout?: 'top' | 'middle' | 'bottom' | 'split';
    quote?: TextElement | null;
    author?: TextElement | null;
    spacing?: number;
    background?: BackgroundElement | null;
    header?: HeaderConfig | null;
    footer?: FooterConfig | null;
    current?: boolean;
    preload?: boolean;
    className?: string | null;
}

function QuoteScreen({
    layout = 'top',
    quote = null,
    author = null,
    spacing = 20,
    background = null,
    header = null,
    footer = null,
    current = true,
    preload = true,
    className = null,
}: QuoteScreenProps) {
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

    const isSplitted = layout === 'split';
    const isTopLayout = layout === 'top';
    const isMiddleLayout = layout === 'middle';
    const isBottomLayout = layout === 'bottom';
    const verticalAlign = isSplitted ? null : layout;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const hasQuote = isTextFilled(quote);
    const hasAuthor = isTextFilled(author);

    const quoteWithMargin = hasQuote && hasAuthor && !isSplitted;
    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const mediaShouldLoad = current || preload;

    return (
        <div
            className={classNames([
                styles.container,
                className,
                {
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
                                  paddingLeft: spacing,
                                  paddingRight: spacing,
                                  paddingTop:
                                      (!isPreview ? viewerTopHeight : 0) +
                                      (hasHeader ? spacing / 2 : spacing),
                                  paddingBottom:
                                      (!isPreview ? viewerBottomHeight : 0) +
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

                    <ScreenElement
                        key="quote"
                        placeholder="quote"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Quote"
                                description="Quote placeholder"
                            />
                        }
                        emptyClassName={styles.emptyQuote}
                        isEmpty={!hasQuote}
                    >
                        {hasQuote ? (
                            <Quote
                                className={classNames([
                                    styles.quote,
                                    { [styles.withMargin]: quoteWithMargin },
                                ])}
                                {...quote}
                            />
                        ) : null}
                    </ScreenElement>

                    {isSplitted ? <Spacer key="spacer" /> : null}

                    <ScreenElement
                        key="author"
                        placeholder="subtitle"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Author"
                                description="Author placeholder"
                            />
                        }
                        emptyClassName={styles.emptyAuthor}
                        isEmpty={!hasAuthor}
                    >
                        {hasAuthor ? <Text className={styles.author} {...author} /> : null}
                    </ScreenElement>

                    {!isPlaceholder && hasFooter && (isTopLayout || isMiddleLayout) ? (
                        <Spacer key="spacer-cta-bottom" />
                    ) : null}

                    {!isPlaceholder && hasHeader && !hasFooter && isMiddleLayout ? (
                        <Spacer key="spacer-cta-bottom" />
                    ) : null}

                    {!isPlaceholder && hasFooter ? (
                        <div
                            style={{
                                paddingTop: spacing,
                                paddingLeft: Math.max(viewerBottomSidesWidth - spacing, 0),
                                paddingRight: Math.max(viewerBottomSidesWidth - spacing, 0),
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
                    shouldLoad={mediaShouldLoad}
                    mediaRef={mediaRef}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
}

export default QuoteScreen;
