/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable no-param-reassign, react/jsx-props-no-spreading */
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
    const isAnimated = isView;
    const hasIframeSlideIn =
        !isEdit && !isPlaceholder && isBackgroundVideo && backgroundPlaying && !firstInteraction;
    const hasIframeBounce = !isEdit && !isPlaceholder && !firstInteraction;

    const toggleIframe = useCallback(() => {
        setIframeOpened(!iframeOpened);
        if (firstInteraction === false) {
            setFirstInteraction(true);
        }
    }, [iframeOpened, firstInteraction, setFirstInteraction, setIframeOpened]);

    useEffect(() => {
        let id = null;
        if (iframeOpened) {
            disableInteraction();
            id = setTimeout(() => {
                setIframeInteractionEnabled(true);
            }, 200);
        } else {
            enableInteraction();
            setIframeInteractionEnabled(false);
        }
        return () => {
            clearTimeout(id);
        };
    }, [iframeOpened, setIframeInteractionEnabled]);

    useEffect(() => {
        if (!current) {
            setIframeOpened(false);
        }
    }, [current]);

    const bind = useGesture(
        {
            onDrag: ({ movement: [, my], tap }) => {
                if ((!iframeOpened && my < 0) || (iframeOpened && my > 0) || tap) {
                    toggleIframe();
                }
            },
            onWheel: ({ movement: [, my] }) => {
                if ((!iframeOpened && my > 0) || (iframeOpened && my < 0)) {
                    toggleIframe();
                }
            },
        },
        { drag: { axis: 'y' }, wheel: { axis: 'y' } },
    );

    const [springStyle, springApi] = useSpring(
        () => ({
            from: { y: height * 0.25 + 5 },
            to: { y: 0 },
            delay: hasIframeSlideIn ? 700 : 0,
            immediate: !isAnimated || !hasIframeSlideIn,
            // loop: hasIframeSlideIn,
            // onResolve: () => {
            //     onAnimationEnded(index);
            // },
            // config: { mass: 1, tension: 140, friction: 14 },
            config: {
                easing: easings.easeInOutElastic,
                // frequency: 100,
                duration: hasIframeSlideIn ? 300 : 2000,
            },
        }),
        [],
    );

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
                                className={classNames([
                                    styles.popupContainer,
                                    {
                                        [styles.pulse]: isAnimated && hasIframeBounce,
                                    },
                                ])}
                                style={{
                                    height,
                                    width,
                                    top: iframeOpened ? 0 : '75%',
                                    ...springStyle,
                                }}
                            >
                                <button
                                    type="button"
                                    {...bind()}
                                    style={{
                                        height: iframeOpened ? '100px' : height,
                                        width,
                                        // position: iframeOpened ? 'absolute' : 'relative',
                                        zIndex: 5,
                                    }}
                                    onClick={toggleIframe}
                                    className={styles.interactiveZone}
                                />
                                {iframeInteractionEnabled ? (
                                    <Button className={styles.close} onClick={toggleIframe}>
                                        <Close color="#000" className={styles.closeIcon} />
                                    </Button>
                                ) : null}
                                <iframe
                                    className={classNames([
                                        styles.iframe,
                                        {
                                            [styles.opened]: iframeOpened,
                                        },
                                    ])}
                                    title={title.body}
                                    src={url || 'about:blank'}
                                    scrolling={iframeOpened ? 'yes' : 'no'} // @TODO: deprecated, find beter solution
                                    style={{
                                        width,
                                        height,
                                        pointerEvents: iframeInteractionEnabled ? 'auto' : 'none',
                                        overflow: iframeOpened ? 'hidden' : null,
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
