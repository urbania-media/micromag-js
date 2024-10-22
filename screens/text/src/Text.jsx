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
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';

import styles from './text.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    text: MicromagPropTypes.textElement,
    title: MicromagPropTypes.headingElement,
    withTitle: PropTypes.bool,
    spacing: PropTypes.number,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    preload: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    text: null,
    title: null,
    withTitle: false,
    spacing: 20,
    header: null,
    footer: null,
    background: null,
    current: true,
    preload: true,
    className: null,
};

const TextScreen = ({
    layout,
    text,
    title,
    withTitle,
    spacing,
    header,
    footer,
    background,
    current,
    preload,
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

    const hasTitle = isTextFilled(title);
    const hasText = isTextFilled(text);

    const isSplitted = layout === 'split';
    const isTopLayout = layout === 'top';
    const isMiddleLayout = layout === 'middle';
    const isBottomLayout = layout === 'bottom';
    const verticalAlign = isSplitted ? null : layout;

    const titleWithMargin = hasTitle && hasText && !isSplitted;

    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || preload;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

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

                    {withTitle ? (
                        <ScreenElement
                            key="title"
                            placeholder="title"
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Title"
                                    description="Title placeholder"
                                />
                            }
                            emptyClassName={styles.emptyTitle}
                            isEmpty={!hasTitle}
                        >
                            {hasTitle ? (
                                <Heading
                                    className={classNames([
                                        styles.title,
                                        { [styles.withMargin]: titleWithMargin },
                                    ])}
                                    {...title}
                                />
                            ) : null}
                        </ScreenElement>
                    ) : null}

                    {isSplitted && withTitle ? <Spacer key="spacer" /> : null}

                    <ScreenElement
                        key="description"
                        placeholder="text"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Text"
                                description="Text placeholder"
                            />
                        }
                        emptyClassName={styles.emptyText}
                        isEmpty={!hasText}
                    >
                        {hasText ? <Text className={styles.text} {...text} /> : null}
                    </ScreenElement>

                    {!isPlaceholder && hasFooter && (isTopLayout || isMiddleLayout) ? (
                        <Spacer key="spacer-cta-bottom" />
                    ) : null}

                    {!isPlaceholder && hasHeader && !hasFooter && isMiddleLayout ? (
                        <Spacer key="spacer-cta-bottom" />
                    ) : null}

                    {!isPlaceholder && hasFooter ? (
                        <div
                            className={styles.footer}
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
                    shouldLoad={mediaShouldLoad}
                    mediaRef={mediaRef}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default TextScreen;
