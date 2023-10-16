/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useMemo } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';

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
import {
    isTextFilled,
    isHeaderFilled,
    isFooterFilled,
    getFooterProps,
    isImageFilled,
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

import styles from './article.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal']),
    image: MicromagPropTypes.visual,
    title: MicromagPropTypes.title,
    surtitle: MicromagPropTypes.text,
    date: MicromagPropTypes.date,
    // author: MicromagPropTypes.author, // potential to integrate more complete author element
    author: MicromagPropTypes.text,
    text: MicromagPropTypes.text,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    current: PropTypes.bool,
    active: PropTypes.bool,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    image: null,
    title: null,
    surtitle: null,
    date: null,
    author: null,
    text: null,
    spacing: 20,
    background: null,
    header: null,
    footer: null,
    current: true,
    active: true,
    type: null,
    className: null,
};

const ArticleScreen = ({
    // layout,
    image,
    title,
    surtitle,
    date,
    author,
    text,
    spacing,
    background,
    header,
    footer,
    current,
    active,
    type,
    className,
}) => {
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
    const mediaRef = usePlaybackMediaRef(current);

    const { ref: imageCntRef, height: imageHeight } = useDimensionObserver();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    const ready = true;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const hasText = isTextFilled(text);

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const hasTitle = isTextFilled(title);
    const hasSurtitle = isTextFilled(surtitle);
    const hasAuthor = isTextFilled(author);
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
            isEmpty={!hasAuthor}
        >
            {hasAuthor ? <Text className={styles.author} {...author} /> : null}
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
                },
            ])}
            data-screen-ready={ready}
        >
            <Container width={width} height={height} className={styles.content}>
                <Scroll
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
                                      paddingTop:
                                          (!isPreview ? viewerTopHeight : 0) +
                                          (hasHeader ? spacing / 2 : spacing / 2 + imageHeight),
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
                                    paddingBottom: imageHeight > 0 ? imageHeight : spacing,
                                }}
                            >
                                <Header {...header} />
                            </div>
                        ) : null}
                        {imageElement}
                        <div className={styles.topContent}>
                            {surtitleElement}
                            {dateElement}
                        </div>
                        {titleElement}
                        {authorElement}

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
};

ArticleScreen.propTypes = propTypes;
ArticleScreen.defaultProps = defaultProps;

export default React.memo(ArticleScreen);
