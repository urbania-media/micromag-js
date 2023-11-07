/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions, no-param-reassign, react/jsx-props-no-spreading */
import { animated as a, useSpring, easings } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Close, Empty, PlaceholderText, ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    usePlaybackContext,
    useViewerContext,
    useViewerInteraction,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { isTextFilled, isHeaderFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Header from '@micromag/element-header';
import Layout from '@micromag/element-layout';
import Text from '@micromag/element-text';

import styles from './urbania-base-article-card.module.scss';

const propTypes = {
    hasArticle: PropTypes.bool,
    url: PropTypes.string,
    title: PropTypes.string,
    text: MicromagPropTypes.textElement,
    image: MicromagPropTypes.visualElement,
    header: MicromagPropTypes.header,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    spacing: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    hasArticle: false,
    url: null,
    title: null,
    text: null,
    image: null,
    header: null,
    background: null,
    current: true,
    active: true,
    spacing: 20,
    className: null,
};

const UrbaniaArticleCard = ({
    hasArticle,
    url,
    title,
    text,
    image,
    header,
    background,
    current,
    active,
    spacing,
    className,
}) => {
    const isSafari = navigator.userAgent.match(/safari/i) !== null;

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

    const hasUrl = url !== null && url.length > 0;
    const hasHeader = isHeaderFilled(header);
    const hasText = isTextFilled(text);

    // iframe interaction
    const [iframeOpened, setIframeOpened] = useState(false);
    const [iframeInteractionEnabled, setIframeInteractionEnabled] = useState(false);
    const [firstInteraction, setFirstInteraction] = useState(false);

    const mediaShouldLoad = current || active;
    const backgroundPlaying = current && (isView || isEdit) && !iframeOpened;

    // iframe animation
    const hasIframeAnimation =
        !isEdit && !isPlaceholder && !isPreview && !isStatic && !firstInteraction;
    const slideInDelay = hasIframeAnimation && isBackgroundVideo && backgroundPlaying;
    const hasIframeBounce = hasIframeAnimation && current && !iframeOpened;

    const toggleIframe = useCallback(() => {
        const newIframeOpened = !iframeOpened;

        setIframeOpened(newIframeOpened);
        if (newIframeOpened) {
            disableInteraction();
        } else {
            enableInteraction();
        }

        setFirstInteraction(true);
    }, [iframeOpened, setFirstInteraction, setIframeOpened, disableInteraction, enableInteraction]);

    const bind = useGesture(
        {
            onDrag: ({ movement: [, my] }) => {
                if ((!iframeOpened && my < 0) || (iframeOpened && my > 0)) {
                    toggleIframe();
                }
            },
            onWheel: ({ movement: [, my] }) => {
                if ((!iframeOpened && my > 0) || (iframeOpened && my < 0)) {
                    toggleIframe();
                }
            },
        },
        { drag: { axis: 'y', filterTaps: true, preventDefault: true }, wheel: { axis: 'y' } },
    );

    let y = 100;
    if (current && iframeOpened) {
        y = 0;
    } else if (current) {
        y = 75;
    }

    const springStyle = useSpring({
        from: { y: 100 },
        to: { y },
        onStart: () => {
            setIframeInteractionEnabled(false);
        },
        onResolve: () => {
            if (iframeOpened) {
                setIframeInteractionEnabled(true);
            }
        },
        delay: slideInDelay ? 1500 : 0,
        config: {
            // easing: easings.easeInOutElastic,
            easing: easings.easeInOutSine,
            duration: y === 100 ? 1000 : 400,
        },
    });

    useEffect(() => {
        if (!current) {
            setIframeOpened(false);
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
                        styles.iframeContainer,
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
                        {(!isPreview || !isPlaceholder) && hasArticle ? (
                            <a.div
                                className={styles.popupContainer}
                                style={{
                                    height,
                                    width,
                                    transform: springStyle.y.to((value) => `translateY(${value}%`),
                                    // top: iframeOpened ? 0 : '75%',
                                    // ...springStyle,
                                }}
                            >
                                <div
                                    className={classNames([
                                        styles.popupContainerInner,
                                        {
                                            [styles.opened]: iframeOpened,
                                            [styles.pulse]: hasIframeBounce,
                                        },
                                    ])}
                                >
                                    <button
                                        type="button"
                                        style={{
                                            height: iframeInteractionEnabled ? '100px' : height,
                                            width,
                                            zIndex: 5,
                                        }}
                                        onClick={toggleIframe}
                                        className={styles.interactiveZone}
                                        {...(current ? bind() : null)}
                                    />
                                    {iframeInteractionEnabled ? (
                                        <Button className={styles.close} onClick={toggleIframe}>
                                            <Close color="#000" className={styles.closeIcon} />
                                        </Button>
                                    ) : null}
                                    <iframe
                                        className={styles.iframe}
                                        title={title.body}
                                        src={url || 'about:blank'}
                                        scrolling={!iframeOpened && !isSafari ? 'no' : 'auto'}
                                        style={{
                                            width: '100%',
                                            height,
                                            overflow: !iframeOpened ? 'hidden' : 'auto',
                                        }}
                                    />
                                    <div
                                        className={classNames([
                                            styles.iframeBlocker,
                                            {
                                                [styles.active]: !iframeInteractionEnabled,
                                            },
                                        ])}
                                        style={{ width, height: height * 0.25 }}
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

export default React.memo(UrbaniaArticleCard);
