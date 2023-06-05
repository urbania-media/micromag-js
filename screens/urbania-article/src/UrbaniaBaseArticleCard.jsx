/* eslint-disable no-param-reassign, react/jsx-props-no-spreading */
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
    transitions: MicromagPropTypes.transitions,
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
    transitions: null,
    spacing: 20,
    className: null,
};

const UrbaniaArticleCardw = ({
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

    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { topHeight: viewerTopHeight } = useViewerContext();
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const { muted } = usePlaybackContext();

    const hasUrl = url !== null && url.length > 0;
    const hasHeader = isHeaderFilled(header);
    const hasText = isTextFilled(text);

    const mediaShouldLoad = current || active;
    const backgroundPlaying = current && (isView || isEdit);

    // iframe interaction
    const [iframeOpened, setIframeOpened] = useState(false);
    const [pointerEventsEnabled, setPointerEventsEnabled] = useState(false);

    const toggleIframe = useCallback(() => {
        setIframeOpened(!iframeOpened);
    }, [iframeOpened, setIframeOpened]);

    useEffect(() => {
        let id = null;
        if (iframeOpened) {
            disableInteraction();
            id = setTimeout(() => {
                setPointerEventsEnabled(true);
            }, 200);
        } else {
            enableInteraction();
            setPointerEventsEnabled(false);
        }
        return () => {
            clearTimeout(id);
        };
    }, [iframeOpened, setPointerEventsEnabled]);

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
                            <>
                                <div
                                    {...bind()}
                                    style={{
                                        height: iframeOpened ? '100px' : height,
                                        width,
                                        position: iframeOpened ? 'absolute' : 'relative',
                                        zIndex: iframeOpened ? 5 : 'auto',
                                    }}
                                    className={styles.interactiveZone}
                                />
                                {pointerEventsEnabled ? (
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
                                    title={title}
                                    src={url || 'about:blank'}
                                    style={{
                                        width,
                                        height: iframeOpened ? height : height * 0.45,
                                        pointerEvents: pointerEventsEnabled ? 'auto' : 'none',
                                    }}
                                />
                            </>
                        ) : null}
                    </ScreenElement>
                </Container>
            </Container>
        </div>
    );
};

UrbaniaArticleCardw.propTypes = propTypes;
UrbaniaArticleCardw.defaultProps = defaultProps;

export default React.memo(UrbaniaArticleCardw);
