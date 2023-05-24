/* eslint-disable no-param-reassign, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
    useViewerContext,
    useViewerInteraction,
} from '@micromag/core/contexts';
import { isHeaderFilled, isFooterFilled, getFooterProps } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';

import ArrowIcon from './icons/ArrowIcon';
import WatchIcon from './icons/WatchIcon';

import styles from './urbania-article-new.module.scss';

const propTypes = {
    hasArticle: PropTypes.bool,
    type: PropTypes.oneOf(['article', 'video']),
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
    header,
    footer,
    background,
    current,
    active,
    spacing,
    className,
}) => {
    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const { color: backgroundColor = null } = background || {};
    const { opened: openedWebView, open: openWebView } = useViewerWebView();
    const { bottomSidesWidth: viewerBottomSidesWidth, topHeight: viewerTopHeight } =
        useViewerContext();
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    console.log(isPreview);

    const { muted, playing } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const isVideo = type === 'video';

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
            openWebView,
            isPreview,
            animationDisabled: isPreview,
            focusable: current && isView,
            enableInteraction,
            disableInteraction,
        },
    );

    const { video: backgroundVideo = null } = background || {};
    const hasVideoBackground = backgroundVideo !== null;
    const mediaShouldLoad = current || active;
    const backgroundPlaying = current && !openedWebView && (isView || isEdit);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isCurrent]: current,
                    [styles.isVideo]: isVideo,
                    [styles.hasVideoBackground]: hasVideoBackground,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready={isStatic || isCapture}
        >
            <Background
                className={styles.background}
                background={background}
                width={width}
                height={height}
                resolution={resolution}
                playing={backgroundPlaying}
                muted={muted}
                shouldLoad={mediaShouldLoad}
                // mediaRef={imageType !== 'video' && hasVideoBackground ? mediaRef : null}
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
                        isEmpty={false} // fix
                    >
                        {!isPreview || !isPlaceholder ? (
                            <iframe
                                className={styles.iframe}
                                // ref={iframeRef}
                                title="Popup"
                                // src={url || 'about:blank'}
                                src="https://simple.urbania.ca.test:8080/article/pourquoi-la-generation-z-trippe-autant-sur-shrek?new"
                                style={{ width, height }}
                            />
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

UrbaniaArticleNew.propTypes = propTypes;
UrbaniaArticleNew.defaultProps = defaultProps;

export default React.memo(UrbaniaArticleNew);
