/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, no-param-reassign, react/jsx-props-no-spreading */
import { animated as a, easings, useSpring } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Close, Empty, PlaceholderText, ScreenElement, Spinner } from '@micromag/core/components';
import {
    usePlaybackContext,
    usePlaybackMediaRef,
    useScreenRenderContext,
    useScreenSize,
    useViewerContext,
    useViewerInteraction,
} from '@micromag/core/contexts';
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
    active: PropTypes.bool,
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
    active: true,
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
    active,
    spacing,
    className,
}) => {
    const finalBackground = background !== null ? background : { image };

    const { video: backgroundVideo = null } = finalBackground || {};

    const isBackgroundVideo = backgroundVideo !== null;

    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { topHeight: viewerTopHeight } = useViewerContext();
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const { name: authorName = null } = author || {};

    const hasUrl = url !== null && url.length > 0;
    const hasHeader = isHeaderFilled(header);
    const hasText = isTextFilled(text);
    const hasTitle = isTextFilled(title);
    const hasAuthorName = isTextFilled(authorName);
    const hasCta = isTextFilled(callToAction);

    const [firstInteraction, setFirstInteraction] = useState(false);
    const [cardOpened, setCardOpened] = useState(false);
    const [iframeInteractionEnabled, setIframeInteractionEnabled] = useState(false);
    const [isIFrameLoaded, setIsIFrameLoaded] = useState(false);
    const [showIFrameSpinner, setShowIFrameSpinner] = useState(false);

    const mediaShouldLoad = current || active;
    const backgroundPlaying = current && (isView || isEdit) && !cardOpened;

    const withIframe = hasUrl && !isPlaceholder && !isPreview && !isStatic;

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
    const withCardAnimation = !isPlaceholder && !isPreview && !isStatic && !firstInteraction;
    const slideInDelay = withCardAnimation && isBackgroundVideo && backgroundPlaying;
    const withCardBounce = withCardAnimation && current && !cardOpened;

    const toggleCard = useCallback(() => {
        const newCardOpened = !cardOpened;

        setCardOpened(newCardOpened);
        if (newCardOpened) {
            disableInteraction();
        } else {
            enableInteraction();
        }

        setFirstInteraction(true);
    }, [cardOpened, setFirstInteraction, setCardOpened, disableInteraction, enableInteraction]);

    // show iframe spinner if load time > 3s
    useEffect(() => {
        if (isIFrameLoaded) {
            return;
        }
        let id = null;
        if (cardOpened) {
            id = setTimeout(() => {
                if (!isIFrameLoaded) {
                    setShowIFrameSpinner(true);
                }
            }, 3000);
        } else {
            setShowIFrameSpinner(false);
        }
        // eslint-disable-next-line consistent-return
        return () => {
            clearTimeout(id);
        };
    }, [cardOpened, isIFrameLoaded]);

    const onIframeLoad = useCallback(() => {
        setIsIFrameLoaded(true);
        setShowIFrameSpinner(false);
    }, [setIsIFrameLoaded, setShowIFrameSpinner]);

    const bind = useGesture(
        {
            onDrag: ({ movement: [, my] }) => {
                if ((!cardOpened && my < 0) || (cardOpened && my > 0)) {
                    toggleCard();
                }
            },
            onWheel: ({ movement: [, my] }) => {
                if ((!cardOpened && my > 0) || (cardOpened && my < 0)) {
                    toggleCard();
                }
            },
        },
        { drag: { axis: 'y', filterTaps: true, preventDefault: true }, wheel: { axis: 'y' } },
    );

    let y = 100;
    if (current && cardOpened) {
        y = 0;
    } else if (current) {
        y = 75;
    }

    const springStyle = useSpring({
        from: { y: isPreview ? y : 100 },
        to: { y },
        onStart: () => {
            setIframeInteractionEnabled(false);
        },
        onResolve: () => {
            if (cardOpened) {
                setIframeInteractionEnabled(true);
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
            setCardOpened(false);
            setFirstInteraction(false);
        }
    }, [current]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
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
                                        : 'translateY(75%)',
                                }}
                            >
                                <div
                                    className={classNames([
                                        styles.cardInner,
                                        {
                                            [styles.opened]: cardOpened,
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
                                    <button
                                        type="button"
                                        style={{
                                            height: iframeInteractionEnabled ? '100px' : height,
                                            width,
                                            zIndex: 6,
                                        }}
                                        onClick={toggleCard}
                                        className={styles.interactiveZone}
                                        {...(current ? bind() : null)}
                                    />
                                    {iframeInteractionEnabled ? (
                                        <Button className={styles.close} onClick={toggleCard}>
                                            <Close color="#000" className={styles.closeIcon} />
                                        </Button>
                                    ) : null}
                                    <div className={styles.articlePreview}>
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
                                    {showIFrameSpinner ? (
                                        <div className={styles.spinnerContainer}>
                                            <Spinner className={styles.spinner} />
                                        </div>
                                    ) : null}
                                    {(cardOpened || firstInteraction) && withIframe ? (
                                        <iframe
                                            onLoad={onIframeLoad}
                                            className={styles.iframe}
                                            title={title.body}
                                            src={url || 'about:blank'}
                                            style={{
                                                width: '100%',
                                                height,
                                            }}
                                        />
                                    ) : null}
                                    {/* Blocker no longer necessary? */}
                                    <div
                                        className={classNames([
                                            styles.iframeBlocker,
                                            {
                                                [styles.active]: !iframeInteractionEnabled,
                                            },
                                        ])}
                                        style={{
                                            width,
                                            height: height * 0.25,
                                        }}
                                    />
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
