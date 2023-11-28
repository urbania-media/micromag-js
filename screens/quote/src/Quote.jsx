/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
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
import { isTextFilled, isHeaderFilled, isFooterFilled, getFooterProps } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Layout, { Spacer } from '@micromag/element-layout';
import Quote from '@micromag/element-quote';
import Text from '@micromag/element-text';

import styles from './quote.module.scss';

// NOTE: this might be better with a scroll

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    quote: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    current: PropTypes.bool,
    active: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    quote: null,
    author: null,
    spacing: 20,
    background: null,
    header: null,
    footer: null,
    current: true,
    active: true,
    className: null,
};

const QuoteScreen = ({
    layout,
    quote,
    author,
    spacing,
    background,
    header,
    footer,
    current,
    active,
    className,
}) => {
    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

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
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
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
};

QuoteScreen.propTypes = propTypes;
QuoteScreen.defaultProps = defaultProps;

export default QuoteScreen;
