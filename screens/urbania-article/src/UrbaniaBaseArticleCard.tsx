import { animated as a, easings, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import isString from 'lodash/isString';
import queryString from 'query-string';
import React, { useCallback, useEffect, useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type {
    AuthorElement,
    BackgroundElement,
    Header as HeaderConfig,
    HeadingElement,
    TextElement,
    VisualElement,
} from '@micromag/core';
import { Empty, PlaceholderText, ScreenElement } from '@micromag/core/components';
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
import Container from '@micromag/element-container';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Text from '@micromag/element-text';
import UrbaniaAuthor from '@micromag/element-urbania-author';

import Arrow from './icons/ArrowIcon';

import styles from './urbania-base-article-card.module.css';

interface UrbaniaArticleCardProps {
    hasArticle?: boolean;
    url?: string | null;
    title?: HeadingElement | null;
    author?: AuthorElement | null;
    text?: TextElement | null;
    image?: VisualElement | null;
    header?: HeaderConfig | null;
    background?: BackgroundElement | null;
    callToAction?: TextElement | null;
    current?: boolean;
    preload?: boolean;
    spacing?: number;
    className?: string | null;
}

function UrbaniaArticleCard({
    hasArticle = false,
    url = null,
    title = null,
    author = null,
    text = null,
    image = null,
    header = null,
    background = null,
    callToAction = null,
    current = true,
    preload = true,
    spacing = 20,
    className = null,
}: UrbaniaArticleCardProps) {
    const intl = useIntl();

    const finalBackground =
        background !== null &&
        ((typeof background.color !== 'undefined' && background.color !== null) ||
            (typeof background.image !== 'undefined' && background.image !== null) ||
            (typeof background.video !== 'undefined' && background.video !== null))
            ? background
            : { image };

    const { video: backgroundVideo = null } = finalBackground || {};
    const isBackgroundVideo = backgroundVideo !== null;
    const { width, height, resolution } = useScreenSize();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const {
        open: openWebView,
        opened: webviewOpened = false,
        close: closeWebView = null,
    } = useViewerWebView();

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
    const finalUrl = useMemo(() => {
        const cleanedUrl = hasUrl
            ? url.replace(/^https?:\/\/([^.]+\.)?urbania\.(fr|ca)\//, 'https://urbania.$2/')
            : url;
        const currentQueryString = queryString.parse(
            cleanedUrl !== null && cleanedUrl.indexOf('?') !== -1 ? cleanedUrl.split('?')[1] : '',
        );
        return cleanedUrl !== null
            ? `${cleanedUrl.split('?')[0]}?${queryString.stringify({
                  reader: true,
                  _ref: 'micromag',
                  ...currentQueryString,
              })}`
            : url;
    }, [hasUrl, url]);

    const mediaShouldLoad = current || preload;

    const { ref: mediaRef, isCurrent: isCurrentMedia = false } = usePlaybackMediaRef(
        current && !webviewOpened,
        true,
    );
    const backgroundPlaying = current && (isView || isEdit) && (isCurrentMedia || !isView);

    // card animations
    const withCardAnimation = !isPlaceholder && !isPreview && !isStatic;
    const slideInDelay = withCardAnimation && isBackgroundVideo && backgroundPlaying;
    const withCardBounce = withCardAnimation && current;

    useEffect(() => {
        if (!current) {
            return () => {};
        }

        setControlsTheme({
            seekBarOnly: true,
        });

        if (isBackgroundVideo && !webviewOpened) {
            setControls(true);
        } else {
            setControls(false);
        }

        return () => {
            if (isBackgroundVideo && !webviewOpened) {
                setControls(false);
            }
        };
    }, [current, setControls, isBackgroundVideo, webviewOpened, setControls, setControlsTheme]);

    const toggleCard = useCallback(() => {
        const newOpened = !webviewOpened;

        if (newOpened) {
            openWebView(finalUrl);
            // console.log('web open');
            disableInteraction();
        } else {
            enableInteraction();
            // console.log('web not open');
        }
    }, [webviewOpened, disableInteraction, enableInteraction, openWebView, finalUrl]);

    const bindGesture = useGesture(
        {
            onDrag: ({ movement: [, my] }) => {
                if ((!webviewOpened && my < 0) || (webviewOpened && my > 0)) {
                    toggleCard();
                }
            },
            onWheel: ({ movement: [, my] }) => {
                if ((!webviewOpened && my > 0) || (webviewOpened && my < 0)) {
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
        disabled: !webviewOpened,
    });

    const { height: articlePreviewHeight = 0 } = articlePreviewContentRect || {};

    // Think about this
    const minimumVisibility = 20;
    let y = 100;
    if (current) {
        y = 100 - Math.max((articlePreviewHeight / height) * 100, minimumVisibility);
    }

    const springStyle = useSpring({
        from: {
            y: isPreview ? y : 100,
        },
        to: {
            y,
        },
        delay: slideInDelay ? 1500 : 0,
        config: {
            easing: easings.easeInOutSine,
            duration: y === 100 ? 1000 : 400,
        },
    });

    // TODIO: current switches on/off for a split second and fucks this up
    useEffect(() => {
        if (!current && webviewOpened && closeWebView !== null) {
            // console.log('web close');
            // closeWebView();
            // enableInteraction();
        }
    }, [current, webviewOpened, closeWebView, enableInteraction]);

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
                className,
                {
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
                playing={backgroundPlaying && !webviewOpened}
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
                                    tabIndex={!current ? -1 : 0}
                                    aria-label={intl.formatMessage({
                                        defaultMessage: 'Toggle article',
                                        description: 'Button label',
                                    })}
                                    aria-pressed={webviewOpened}
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
                                </div>
                            </a.div>
                        ) : null}
                    </ScreenElement>
                </Container>
            </Container>
        </div>
    );
}

export default UrbaniaArticleCard;
