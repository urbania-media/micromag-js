import classNames from 'classnames';
import dayjs from 'dayjs';
import React, { useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type {
    BackgroundElement,
    Footer as FooterConfig,
    Header as HeaderConfig,
    ImageMedia,
    Text,
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
import { useDimensionObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import {
    getFooterProps,
    isFooterFilled,
    isHeaderFilled,
    isImageFilled,
    isTextFilled,
} from '@micromag/core/utils';
import Author from '@micromag/element-author';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';

import styles from './article.module.css';

interface ArticleScreenProps {
    layout?: 'normal';
    image?: ImageMedia | null;
    title?: Text | null;
    surtitle?: Text | null;
    date?: string | null;
    author?: Record<string, unknown> | null;
    text?: Text | null;
    subtitle?: Text | null;
    spacing?: number;
    background?: BackgroundElement | null;
    header?: HeaderConfig | null;
    footer?: FooterConfig | null;
    current?: boolean;
    preload?: boolean;
    type?: string | null;
    className?: string | null;
}

function ArticleScreen({
    // layout,
    image = null,

    title = null,
    surtitle = null,
    date = null,
    author = null,
    subtitle = null,
    text = null,
    spacing = 20,
    background = null,
    header = null,
    footer = null,
    current = true,
    preload = true,
    type = null,
    className = null,
}: ArticleScreenProps) {
    const intl = useIntl();
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, resolution } = useScreenSize();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(current, true);

    const { ref: imageCntRef, height: imageHeight } = useDimensionObserver();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);
    const mediaShouldLoad = current || preload;

    const ready = true;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const {
        name: authorName = null,
        image: authorImage = null,
        collaborator: authorCollabs,
    } = author || {};

    const hasText = isTextFilled(text);
    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const hasTitle = isTextFilled(title);
    const hasSurtitle = isTextFilled(surtitle);
    const hasSubtitle = isTextFilled(subtitle);
    const hasSimpleAuthor = isTextFilled(author); // legacy
    const hasAuthor =
        isTextFilled(authorName) || isImageFilled(authorImage) || isTextFilled(authorCollabs);
    const hasImage = isImageFilled(image);
    const hasDate = isTextFilled(date);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const mediaHeight = useMemo(() => {
        if (!hasImage) {
            return 0;
        }
        const { metadata = {} } = image || {};
        const { width: initialWidth = 0, height: initialHeight = 0 } = metadata || {};
        return (width * initialHeight) / initialWidth;
    }, [image]);

    const partialDate = hasDate ? date.body || null : null;
    const finalDate = useMemo(
        () =>
            partialDate !== null
                ? `<p>${intl.formatDate(dayjs(partialDate).toDate(), {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                  })}</p>`
                : null,
        [partialDate],
    );

    const imageElement = (
        <ScreenElement
            placeholder="image"
            emptyLabel={<FormattedMessage defaultMessage="Image" description="Image placeholder" />}
            emptyClassName={styles.emptyText}
            isEmpty={!hasImage}
        >
            <div ref={imageCntRef} className={styles.visualContainer}>
                {hasImage ? (
                    <Visual
                        media={image}
                        // width={width - spacing * 2} // in layout flow
                        width={width}
                        height={mediaHeight}
                        shouldLoad={mediaShouldLoad}
                        resolution={resolution}
                        className={styles.visual}
                    />
                ) : null}
            </div>
        </ScreenElement>
    );

    const titleElement = (
        <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Title placeholder" />}
            emptyClassName={styles.emptyTitle}
            isEmpty={!hasTitle}
        >
            {hasTitle ? <Heading className={styles.title} {...title} /> : null}
        </ScreenElement>
    );

    const surtitleElement = (
        <ScreenElement
            key="surtitle"
            placeholder="line"
            emptyLabel={
                <FormattedMessage defaultMessage="Surtitle" description="Surtitle placeholder" />
            }
            emptyClassName={styles.emptySurtitle}
            isEmpty={!hasSurtitle}
        >
            {hasSurtitle ? <Text className={styles.surtitle} {...surtitle} /> : null}
        </ScreenElement>
    );

    const subtitleElement = (
        <ScreenElement
            key="subtitle"
            placeholder="line"
            emptyLabel={
                <FormattedMessage defaultMessage="Subtitle" description="Subtitle placeholder" />
            }
            emptyClassName={styles.emptySubtitle}
            isEmpty={!hasSubtitle}
        >
            {hasSubtitle ? <Text className={styles.subtitle} {...subtitle} /> : null}
        </ScreenElement>
    );

    const dateElement = (
        <ScreenElement
            key="date"
            placeholder="line"
            emptyLabel={<FormattedMessage defaultMessage="Date" description="Date placeholder" />}
            emptyClassName={styles.emptyDate}
            isEmpty={!hasDate}
        >
            {hasDate ? <Text className={styles.date} {...date} body={finalDate} /> : null}
        </ScreenElement>
    );

    const authorElement = (
        <ScreenElement
            key="author"
            placeholder="line"
            emptyLabel={
                <FormattedMessage defaultMessage="Author" description="Author placeholder" />
            }
            emptyClassName={styles.emptyAuthor}
            isEmpty={!hasAuthor && !hasSimpleAuthor}
        >
            {hasSimpleAuthor ? <Text className={styles.author} {...author} /> : null}
            {hasAuthor ? <Author author={author} /> : null}
        </ScreenElement>
    );

    const contentElement = (
        <ScreenElement
            placeholder="text"
            emptyLabel={<FormattedMessage defaultMessage="Text" description="Text placeholder" />}
            emptyClassName={styles.emptyText}
            isEmpty={!hasText}
        >
            {hasText ? <Text className={styles.text} {...text} /> : null}
        </ScreenElement>
    );

    const [scrolledBottom, setScrolledBottom] = useState(false);

    const onScrolledBottom = useCallback(
        ({ initial }) => {
            if (initial) {
                trackScreenEvent('scroll', 'Screen');
            }
            setScrolledBottom(true);
        },
        [trackScreenEvent],
    );

    const onScrolledTrigger = useCallback(
        (trigger = null) => {
            if (trigger !== null) {
                const scrollPercent = Math.round(trigger * 100);
                trackScreenEvent('scroll', scrollPercent, { scrollPercent });
            }
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
                className,
                {
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready={ready}
        >
            <Container width={width} height={height} className={styles.content}>
                <Scroll
                    disabled={scrollingDisabled}
                    onScrolledTrigger={onScrolledTrigger}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    withShadow
                >
                    <Layout
                        className={styles.layout}
                        style={
                            !isPlaceholder
                                ? {
                                      paddingLeft: spacing,
                                      paddingRight: spacing,
                                      paddingTop: hasHeader
                                          ? spacing / 2 + (!isPreview ? viewerTopHeight : 0)
                                          : spacing / 2 + imageHeight,
                                      paddingBottom:
                                          (current && !isPreview ? viewerBottomHeight : 0) +
                                          spacing / 2,
                                  }
                                : null
                        }
                    >
                        {!isPlaceholder && hasHeader ? (
                            <div
                                key="header"
                                style={{
                                    height: hasImage && imageHeight > 0 ? 0 : 'auto',
                                    paddingBottom:
                                        imageHeight > 0 ? imageHeight - viewerTopHeight : spacing,
                                }}
                            >
                                <Header {...header} />
                            </div>
                        ) : null}
                        <div
                            className={classNames([
                                styles.main,
                                {
                                    [styles.hasText]: hasText && hasAuthor,
                                },
                            ])}
                        >
                            {imageElement}
                            <div className={styles.topContent}>
                                {surtitleElement}
                                {dateElement}
                            </div>
                            {titleElement}
                            {authorElement}
                            {subtitleElement}
                        </div>

                        {contentElement}

                        {!isPlaceholder && hasFooter ? (
                            <div
                                className={classNames([
                                    styles.footer,
                                    {
                                        [styles.disabled]: !scrolledBottom,
                                    },
                                ])}
                                style={{
                                    paddingLeft: Math.max(viewerBottomSidesWidth - spacing, 0),
                                    paddingRight: Math.max(viewerBottomSidesWidth - spacing, 0),
                                    paddingTop: spacing,
                                }}
                            >
                                <Footer {...footerProps} />
                            </div>
                        ) : null}
                    </Layout>
                </Scroll>
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

export default ArticleScreen;
