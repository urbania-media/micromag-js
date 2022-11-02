/* eslint-disable no-param-reassign, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    ScreenElement,
    Empty,
    PlaceholderImage,
    PlaceholderSubtitle,
    PlaceholderTitle,
} from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext, // useViewerNavigation,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
    useViewerContext,
} from '@micromag/core/contexts';
import { useDimensionObserver, useDebounce } from '@micromag/core/hooks';
import { isTextFilled, getStyleFromColor } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import UrbaniaAuthor from '@micromag/element-urbania-author';
import Visual from '@micromag/element-visual';

import ArrowIcon from './icons/ArrowIcon';
import WatchIcon from './icons/WatchIcon';

import styles from './urbania-article.module.scss';

const propTypes = {
    hasArticle: PropTypes.bool,
    type: PropTypes.oneOf(['article', 'video']),
    image: MicromagPropTypes.visualElement,
    title: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.textElement,
    overTitle: MicromagPropTypes.headingElement,
    author: MicromagPropTypes.authorElement,
    sponsors: PropTypes.arrayOf(PropTypes.shape({})),
    sponsorPrefix: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    sponsorColor: MicromagPropTypes.color,
    site: PropTypes.string,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    spacing: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    hasArticle: false,
    type: null,
    image: null,
    title: null,
    description: null,
    overTitle: null,
    author: null,
    sponsors: null,
    sponsorPrefix: null,
    sponsorColor: null,
    site: null,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    spacing: 20,
    className: null,
};

const UrbaniaArticle = ({
    hasArticle,
    type,
    image,
    title,
    description,
    overTitle,
    author,
    sponsors,
    sponsorPrefix,
    sponsorColor,
    site,
    background,
    callToAction,
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
    const { bottomSidesWidth: viewerBottomSidesWidth } = useViewerContext();
    const { muted, playing, setPlaying } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const {
        ref: contentRef,
        entry: { contentRect },
        height: contentHeight,
    } = useDimensionObserver();
    const { top: contentTop } = contentRect || {};

    const { minContentHeight = null } = useMemo(() => {
        const defaultImageHeight = width * 0.8;
        const difference = height - contentHeight - contentTop + 1;

        if (difference > defaultImageHeight) {
            return { imageHeight: difference };
        }

        return { imageHeight: difference };
    }, [contentTop, contentHeight, width, height]);

    const isVideo = type === 'video';
    const hasOverTitle = isTextFilled(overTitle);
    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);
    const hasSponsor = (sponsors || []).length > 0 && isTextFilled(sponsors[0]);
    const { name: authorFullName } = author || {};
    const hasAuthor = isTextFilled(authorFullName);
    const { url = null } = image || {};
    const hasImage = url !== null;
    const hasCallToAction = callToAction !== null && callToAction.active === true;
    const { video: backgroundVideo = null } = background || {};
    const hasVideoBackground = backgroundVideo !== null;

    const mediaShouldLoad = current || active;
    const [backgroundPlaying, setBackgroundPlaying] = useState(false);

    const playIfCurrent = useCallback(() => {
        const shouldPlay = current && !openedWebView && !playing;

        setPlaying(shouldPlay);
    }, [current, openedWebView, playing, setPlaying]);

    useEffect(() => {
        const shouldBackgroundBePlaying = current && !openedWebView && (isView || isEdit);

        setBackgroundPlaying(shouldBackgroundBePlaying);
    }, [current, isView, isEdit, openedWebView, setBackgroundPlaying]);

    useDebounce(playIfCurrent, current, 500);

    const items = [
        <ScreenElement
            key="overTitle"
            placeholder={<PlaceholderSubtitle className={styles.placeholder} />}
            empty={
                <div className={classNames([styles.emptyContainer, styles.small])}>
                    <Empty className={styles.empty}>
                        <FormattedMessage
                            defaultMessage="Overtitle"
                            description="Title placeholder"
                        />
                    </Empty>
                </div>
            }
            isEmpty={!hasOverTitle}
        >
            {hasOverTitle ? (
                <Heading className={classNames([styles.overTitle])} {...overTitle} />
            ) : null}
        </ScreenElement>,
        <ScreenElement
            key="title"
            placeholder={<PlaceholderTitle className={styles.placeholder} />}
            empty={
                <div className={styles.emptyContainer}>
                    <Empty className={styles.empty}>
                        <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                    </Empty>
                </div>
            }
            isEmpty={!hasTitle}
        >
            {hasTitle ? <Heading className={classNames([styles.title])} {...title} /> : null}
        </ScreenElement>,
        <ScreenElement
            key="authors"
            empty={
                <div className={styles.emptyContainer}>
                    <Empty className={styles.empty}>
                        <FormattedMessage
                            defaultMessage="Authors"
                            description="Authors placeholder"
                        />
                    </Empty>
                </div>
            }
            isEmpty={!hasAuthor}
        >
            {hasAuthor ? (
                <div
                    className={classNames([
                        styles.authors,
                        { [styles.isAboveDescription]: hasDescription },
                    ])}
                >
                    <UrbaniaAuthor author={author} shouldLoad={mediaShouldLoad} />
                </div>
            ) : null}
        </ScreenElement>,
        hasDescription ? (
            <ScreenElement
                key="description"
                empty={
                    <div className={styles.emptyContainer}>
                        <Empty className={styles.empty}>
                            <FormattedMessage
                                defaultMessage="Lede"
                                description="Lede placeholder"
                            />
                        </Empty>
                    </div>
                }
                isEmpty={!hasDescription}
            >
                {hasDescription ? (
                    <div className={classNames([styles.description])}>
                        <Text className={classNames([styles.lede])} {...description} />
                    </div>
                ) : null}
            </ScreenElement>
        ) : null,
        <ScreenElement
            key="sponsors"
            empty={
                <div className={classNames([styles.emptyContainer, styles.small])}>
                    <Empty className={styles.empty}>
                        <FormattedMessage
                            defaultMessage="Sponsors"
                            description="Sponsors placeholder"
                        />
                    </Empty>
                </div>
            }
            isEmpty={!hasSponsor && !hasArticle}
        >
            {hasSponsor ? (
                <div className={styles.sponsors} style={{ ...getStyleFromColor(sponsorColor) }}>
                    {sponsors.map((sponsor = null) => {
                        const { body = '' } = sponsor;
                        return (
                            <React.Fragment key={body}>
                                {sponsorPrefix !== null ? (
                                    <span className={styles.sponsor}>{sponsorPrefix}</span>
                                ) : null}
                                <span>&nbsp;</span>
                                <Heading className={styles.sponsor} size="6" {...sponsor} />
                            </React.Fragment>
                        );
                    })}
                </div>
            ) : null}
        </ScreenElement>,
    ].filter((it) => it !== null);

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
                mediaRef={mediaRef}
                withoutVideo={isPreview}
            />
            <Container className={styles.content} width={width} height={height}>
                <div
                    className={classNames([
                        styles.articleContent,
                        {
                            [styles[`${site}`]]: site !== null,
                        },
                    ])}
                    style={{
                        paddingTop: spacing,
                        minHeight: minContentHeight,
                        ...(!isVideo
                            ? getStyleFromColor(backgroundColor, 'backgroundColor')
                            : null),
                    }}
                    ref={contentRef}
                >
                    {items}
                </div>
                <div className={styles.visual}>
                    <ScreenElement
                        key="image"
                        placeholder={<PlaceholderImage className={styles.placeholder} />}
                        empty={
                            <div className={styles.emptyContainer}>
                                <Empty className={styles.empty}>
                                    <FormattedMessage
                                        defaultMessage="Image"
                                        description="Image placeholder"
                                    />
                                </Empty>
                            </div>
                        }
                        isEmpty={!hasImage}
                    >
                        {hasImage && !isVideo ? (
                            <Visual
                                className={styles.image}
                                imageClassName={styles.img}
                                media={image}
                                width={width}
                                height={height}
                                resolution={resolution}
                                objectFit={{ fit: 'cover' }}
                                shouldLoad={mediaShouldLoad}
                                withoutVideo={isPreview}
                                playing={backgroundPlaying && playing}
                            />
                        ) : null}
                        {hasImage && isVideo && !hasVideoBackground ? (
                            <Visual
                                className={styles.video}
                                media={image}
                                width={width}
                                height={height}
                                resolution={resolution}
                                objectFit={{ fit: 'cover' }}
                                shouldLoad={mediaShouldLoad}
                                playing={backgroundPlaying && playing}
                                muted={muted}
                                withoutVideo={isPreview}
                                mediaRef={mediaRef}
                                autoPlay
                            />
                        ) : null}
                    </ScreenElement>
                </div>
                <div className={styles.callToActionContainer}>
                    {!isPlaceholder && hasCallToAction ? (
                        <div
                            style={{
                                paddingTop: spacing,
                                paddingLeft: Math.max(0, viewerBottomSidesWidth - spacing),
                                paddingRight: Math.max(0, viewerBottomSidesWidth - spacing),
                            }}
                            key="call-to-action"
                        >
                            <CallToAction
                                {...callToAction}
                                className={styles.callToAction}
                                buttonClassName={styles.button}
                                labelClassName={styles.label}
                                arrowClassName={styles.arrow}
                                animationDisabled={isPreview}
                                focusable={current && isView}
                                arrow={<ArrowIcon />}
                                icon={
                                    type === 'video' ? <WatchIcon className={styles.icon} /> : null
                                }
                                openWebView={openWebView}
                            />
                        </div>
                    ) : null}
                </div>
            </Container>
        </div>
    );
};

UrbaniaArticle.propTypes = propTypes;
UrbaniaArticle.defaultProps = defaultProps;

export default React.memo(UrbaniaArticle);
