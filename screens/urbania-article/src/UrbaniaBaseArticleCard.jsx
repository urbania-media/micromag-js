/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, no-param-reassign, react/jsx-props-no-spreading */
import { animated as a, easings, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import isString from 'lodash/isString';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Close, Empty, PlaceholderText, ScreenElement, Spinner } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerInteraction,
    useViewerWebView,
} from '@micromag/core/contexts';
import { useResizeObserver } from '@micromag/core/hooks';
import { isHeaderFilled, isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Text from '@micromag/element-text';
import UrbaniaAuthor from '@micromag/element-urbania-author';

import Arrow from './icons/ArrowIcon';

import styles from './urbania-base-article-card.module.scss';

const propTypes = {
    hasArticle: PropTypes.bool,
    url: PropTypes.string,
    title: MicromagPropTypes.headingElement,
    author: MicromagPropTypes.authorElement,
    text: MicromagPropTypes.textElement,
    image: MicromagPropTypes.visualElement,
    header: MicromagPropTypes.header,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.textElement,
    current: PropTypes.bool,
    preload: PropTypes.bool,
    spacing: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    hasArticle: false,
    url: null,
    title: null,
    author: null,
    text: null,
    image: null,
    header: null,
    background: null,
    callToAction: null,
    current: true,
    preload: true,
    spacing: 20,
    className: null,
};

const UrbaniaArticleCard = ({
    hasArticle,
    url,
    title,
    author,
    text,
    image,
    header,
    background,
    callToAction,
    current,
    preload,
    spacing,
    className,
}) => {
    const intl = useIntl();

    const finalBackground = background !== null ? background : { image };

    const { video: backgroundVideo = null } = finalBackground || {};

    const isBackgroundVideo = backgroundVideo !== null;

    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { open: openWebView } = useViewerWebView();
    const { topHeight: viewerTopHeight, bottomHeight: viewerBottomHeight } = useViewerContext();

    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const { playing, muted, setControls, setControlsTheme, setControlsSuggestPlay, setPlaying } =
        usePlaybackContext();

    const { name: authorName = null } = author || {};

    const hasUrl = url !== null && isString(url) && url.length > 0;
    const hasHeader = isHeaderFilled(header);
    const hasText = isTextFilled(text);
    const hasTitle = isTextFilled(title);
    const hasAuthorName = isTextFilled(authorName);
    const hasCta = isTextFilled(callToAction);

    // const isSimple = hasUrl && url.indexOf('simple.urbania.ca') !== -1;
    const finalUrl = hasUrl
        ? `${url.replace(
              /^https?:\/\/([^.]+\.)?urbania\.(fr|ca)\//,
              'https://urbania.$2/',
          )}${url.indexOf('?') !== -1 ? '&' : '?'}reader`
        : url;

    const [articleOpened, setArticleOpened] = useState(false);
    const [iframeEnabled, setIframeEnabled] = useState(false);
    const [iframeMounted, setIframeMounted] = useState(false);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    const mediaShouldLoad = current || preload;
    const backgroundPlaying = current && (isView || isEdit) && !articleOpened && playing;

    const mediaRef = usePlaybackMediaRef(current && !articleOpened);

    // @TODO: collapsed card the height of articlePreview
    // const articlePreviewRef = useRef();
    // const previewCurrent = articlePreviewRef.current || null;

    // const articlePreviewHeight = useMemo(() => {
    //     if (previewCurrent !== null) {
    //         const { height: previewHeight = 0 } = previewCurrent.getBoundingClientRect();
    //         return previewHeight !== 0 ? previewHeight : 0;
    //     }
    //     return 0;
    // }, [previewCurrent, height]);

    // card animations
    const withCardAnimation = !isPlaceholder && !isPreview && !isStatic && !iframeMounted;
    const slideInDelay = withCardAnimation && isBackgroundVideo && backgroundPlaying;
    const withCardBounce = withCardAnimation && current && !articleOpened;

    useEffect(() => {
        if (!current) {
            return () => {};
        }

        setControlsTheme({
            seekBarOnly: true,
        });

        if (isBackgroundVideo && !articleOpened) {
            setControls(true);
        } else {
            setControls(false);
        }

        return () => {
            if (isBackgroundVideo && !articleOpened) {
                setControls(false);
            }
        };
    }, [current, setControls, isBackgroundVideo, articleOpened, setControls, setControlsTheme]);

    const toggleCard = useCallback(() => {
        const newOpened = !articleOpened;

        if (newOpened) {
            openWebView(finalUrl);
        }

        // setArticleOpened(newOpened);
        // if (newOpened) {
        //     disableInteraction();
        // } else {
        //     enableInteraction();
        // }

        // setIframeMounted(true);
    }, [
        articleOpened,
        setIframeMounted,
        setArticleOpened,
        disableInteraction,
        enableInteraction,
        openWebView,
        finalUrl,
    ]);

    useEffect(() => {
        if (!iframeMounted || iframeLoaded) {
            return () => {};
        }
        const timeout = setTimeout(() => {
            setIframeLoaded(true);
        }, 2000);
        return () => {
            clearTimeout(timeout);
        };
    }, [iframeMounted, iframeLoaded]);

    const bindGesture = useGesture(
        {
            onDrag: ({ movement: [, my] }) => {
                if ((!articleOpened && my < 0) || (articleOpened && my > 0)) {
                    toggleCard();
                }
            },
            onWheel: ({ movement: [, my] }) => {
                if ((!articleOpened && my > 0) || (articleOpened && my < 0)) {
                    toggleCard();
                }
            },
        },
        { drag: { axis: 'y', filterTaps: true, preventDefault: true }, wheel: { axis: 'y' } },
    );

    const {
        ref: articlePreviewRef,
        entry: { contentRect: articlePreviewContentRect = null },
    } = useResizeObserver({
        disabled: !articleOpened,
    });
    const { height: articlePreviewHeight = 0 } = articlePreviewContentRect || {};

    const minimumVisibility = 20;
    let y = 100;
    if (current && articleOpened) {
        y = 0;
    } else if (current || isPreview) {
        y = 100 - Math.max((articlePreviewHeight / height) * 100, minimumVisibility);
    }

    const springStyle = useSpring({
        from: {
            y: isPreview ? y : 100,
        },
        to: {
            y,
        },
        onStart: () => {
            setIframeEnabled(false);
        },
        onResolve: () => {
            if (articleOpened) {
                setIframeEnabled(true);
            }
        },
        delay: slideInDelay ? 1500 : 0,
        config: {
            easing: easings.easeInOutSine,
            duration: y === 100 ? 1000 : 400,
        },
    });

    useEffect(() => {
        if (!current) {
            setArticleOpened(false);
            setIframeMounted(false);
            setIframeLoaded(false);
        }
    }, [current]);

    const onPlayError = useCallback(() => {
        if (isView && playing && current && isBackgroundVideo) {
            setPlaying(false);
            setControlsSuggestPlay(true);
        }
    }, [isView, current, playing, isBackgroundVideo, setPlaying, setControlsSuggestPlay]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.articleOpened]: articleOpened,
                    [styles.isCurrent]: current,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready={isStatic || isCapture}
        >
            <Background
                className={styles.background}
                background={finalBackground}
                width={width}
                height={height}
                resolution={resolution}
                playing={backgroundPlaying}
                muted={muted}
                mediaRef={mediaRef}
                onPlayError={onPlayError}
                shouldLoad={mediaShouldLoad}
                withoutVideo={isPreview}
            />
            <Container className={styles.content} width={width} height={height}>
                {!isPlaceholder && hasHeader ? (
                    <div
                        key="header"
                        className={styles.header}
                        style={{
                            paddingTop: spacing / 2,
                            paddingLeft: spacing,
                            paddingRight: spacing,
                            transform: !isPreview ? `translate(0, ${viewerTopHeight}px)` : null,
                        }}
                    >
                        <Header {...header} />
                    </div>
                ) : null}
                <Layout className={styles.layout} height={height * 0.65}>
                    <ScreenElement
                        key="text"
                        empty={
                            <Empty className={styles.emptyText}>
                                <FormattedMessage
                                    defaultMessage="Text"
                                    description="Text placeholder"
                                />
                            </Empty>
                        }
                        placeholder={<PlaceholderText className={styles.placeholderText} />}
                    >
                        {hasText ? <Text className={styles.text} {...text} /> : null}
                    </ScreenElement>
                </Layout>
                <Container
                    className={classNames([
                        styles.cardContainer,
                        {
                            [styles.isPlaceholder]: isPlaceholder,
                        },
                    ])}
                >
                    <ScreenElement
                        placeholderProps={{ className: styles.placeholder }}
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Article"
                                description="Article placeholder"
                            />
                        }
                        emptyClassName={styles.empty}
                        isEmpty={!hasUrl || !hasArticle}
                    >
                        {!isPlaceholder && hasArticle ? (
                            <a.div
                                className={styles.card}
                                style={{
                                    height,
                                    width,
                                    transform: !isPreview
                                        ? springStyle.y.to((value) => `translateY(${value}%`)
                                        : `translateY(${100 - minimumVisibility}%)`,
                                }}
                            >
                                <button
                                    type="button"
                                    onClick={toggleCard}
                                    className={styles.dragHandle}
                                    tabIndex={!current || articleOpened ? -1 : 0}
                                    aria-label={intl.formatMessage({
                                        defaultMessage: 'Toggle article',
                                        description: 'Button label',
                                    })}
                                    aria-pressed={articleOpened}
                                    {...(current ? bindGesture() : null)}
                                />
                                <div
                                    className={classNames([
                                        styles.cardInner,
                                        {
                                            [styles.pulse]: withCardBounce,
                                        },
                                    ])}
                                >
                                    {hasCta ? (
                                        <div className={styles.callToAction}>
                                            <Arrow strokeWidth={1} className={styles.arrow} />
                                            <Text className={styles.ctaText} {...callToAction} />
                                        </div>
                                    ) : null}
                                    <Button
                                        className={styles.close}
                                        disabled={!current || !articleOpened}
                                        onClick={toggleCard}
                                    >
                                        <Close color="#000" className={styles.closeIcon} />
                                    </Button>
                                    <div className={styles.articlePreview} ref={articlePreviewRef}>
                                        <div
                                            className={styles.articlePreviewInner}
                                            style={{
                                                paddingBottom:
                                                    current && !isPreview
                                                        ? Math.max(viewerBottomHeight, 20)
                                                        : null,
                                            }}
                                        >
                                            {hasTitle ? (
                                                <Heading
                                                    className={classNames([styles.articleTitle])}
                                                    {...title}
                                                />
                                            ) : null}
                                            {hasAuthorName ? (
                                                <UrbaniaAuthor
                                                    isSmall
                                                    withoutBackground
                                                    author={author}
                                                    shouldLoad={mediaShouldLoad}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                    {iframeMounted && !iframeLoaded ? (
                                        <div className={styles.spinnerContainer}>
                                            <Spinner className={styles.spinner} />
                                        </div>
                                    ) : null}
                                    {!iframeEnabled && iframeMounted ? (
                                        <div className={styles.iframeBlocker} />
                                    ) : null}
                                    {/* {iframeMounted && withIframe ? (
                                        <iframe
                                            onLoad={onIframeLoad}
                                            className={styles.iframe}
                                            title={title.body}
                                            src={finalUrl || 'about:blank'}
                                            style={{
                                                width: '100%',
                                                height,
                                            }}
                                        />
                                    ) : null} */}
                                </div>
                            </a.div>
                        ) : null}
                    </ScreenElement>
                </Container>
            </Container>
        </div>
    );
};

UrbaniaArticleCard.defaultProps = defaultProps;
UrbaniaArticleCard.propTypes = propTypes;

export default UrbaniaArticleCard;
