/* eslint-disable no-param-reassign, react/jsx-props-no-spreading */
import { useGesture, useDrag } from '@use-gesture/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Close, ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    usePlaybackContext,
    useViewerContext,
    useViewerInteraction,
} from '@micromag/core/contexts';
import { isHeaderFilled, isFooterFilled, getFooterProps } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';

import ArrowIcon from './icons/ArrowIcon';
import WatchIcon from './icons/WatchIcon';

import styles from './urbania-article-new.module.scss';

const propTypes = {
    hasArticle: PropTypes.bool,
    type: PropTypes.oneOf(['article', 'video']),
    url: PropTypes.string,
    articleTitle: PropTypes.string,
    image: MicromagPropTypes.visualElement,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    spacing: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    hasArticle: false,
    type: null,
    url: null,
    articleTitle: null,
    image: null,
    header: null,
    footer: null,
    background: null,
    current: true,
    active: true,
    transitions: null,
    spacing: 20,
    className: null,
};

const UrbaniaArticleNew = ({
    hasArticle,
    type,
    url,
    articleTitle,
    image,
    header,
    footer,
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
    const { bottomSidesWidth: viewerBottomSidesWidth, topHeight: viewerTopHeight } =
        useViewerContext();
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const { muted } = usePlaybackContext();

    const hasUrl = url !== null && url.length > 0;
    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer) || hasArticle;
    const footerCta = {
        buttonClassName: styles.button,
        labelClassName: styles.label,
        arrowClassName: styles.arrow,
        arrow: <ArrowIcon />,
        icon: type === 'video' ? <WatchIcon className={styles.icon} /> : null,
    };

    const { callToAction = null, ...otherFooterProps } = footer || {};

    const footerProps = getFooterProps(
        {
            ...otherFooterProps,
            callToAction: {
                ...callToAction,
                ...footerCta,
            },
        },
        {
            isView,
            current,

            isPreview,
            animationDisabled: isPreview,
            focusable: current && isView,
            enableInteraction,
            disableInteraction,
        },
    );

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

    // use Y only
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
        { axis: 'y' },
    );

    // @ TODO: REPLACE BY URL BEFORE DEPLOYMENT!!!
    //         LOAD ALL THIS STUFF IN BETA.URBANIA.CA
    const localUrl = hasUrl
        ? url.replace('quatre95', 'simple').replace('.ca', '.ca.test:8080').concat('?new')
        : null;
    // const localUrl = url;

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
                <Container className={styles.iframeContainer}>
                    <ScreenElement
                        placeholder="image"
                        placeholderProps={{ className: styles.placeholder, height: '100%' }}
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Image"
                                description="Image placeholder"
                            />
                        }
                        emptyClassName={styles.emptyImage}
                        isEmpty={!hasUrl}
                    >
                        {!isPreview || !isPlaceholder ? (
                            <>
                                <div
                                    {...bind()}
                                    style={{
                                        // border: '1px solid red',
                                        height: iframeOpened ? '100px' : height,
                                        // height: iframeHeight,
                                        width,
                                        position: iframeOpened ? 'absolute' : 'relative',
                                        zIndex: iframeOpened ? 5 : 'auto',
                                    }}
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
                                    title={articleTitle}
                                    src={localUrl || 'about:blank'}
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

                <div className={styles.footerContainer}>
                    {!isPlaceholder && hasFooter ? (
                        <div
                            style={{
                                paddingTop: spacing,
                                paddingLeft: Math.max(0, viewerBottomSidesWidth - spacing),
                                paddingRight: Math.max(0, viewerBottomSidesWidth - spacing),
                            }}
                            className={styles.footer}
                        >
                            <Footer {...footerProps} />
                        </div>
                    ) : null}
                </div>
            </Container>
        </div>
    );
};

UrbaniaArticleNew.defaultProps = defaultProps;
UrbaniaArticleNew.propTypes = propTypes;

export default React.memo(UrbaniaArticleNew);
