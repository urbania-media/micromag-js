/* eslint-disable no-param-reassign, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
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
    useScreenRenderContext,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
    useViewerContext,
    useViewerInteraction,
} from '@micromag/core/contexts';
import { useDimensionObserver } from '@micromag/core/hooks';
import {
    isTextFilled,
    getStyleFromColor,
    isHeaderFilled,
    isFooterFilled,
    getFooterProps,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import UrbaniaAuthor from '@micromag/element-urbania-author';
import Visual from '@micromag/element-visual';

import ArrowIcon from './icons/ArrowIcon';
import WatchIcon from './icons/WatchIcon';

import styles from './urbania-base-article.module.scss';

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
    image: null,
    title: null,
    description: null,
    overTitle: null,
    author: null,
    sponsors: null,
    sponsorPrefix: null,
    sponsorColor: null,
    site: null,
    header: null,
    footer: null,
    background: null,
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

    const { muted, playing } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const {
        ref: contentRef,
        entry: { contentRect },
        height: contentHeight,
    } = useDimensionObserver();
    const { top: contentTop } = contentRect || {};

    const { minContentHeight = null } = useMemo(() => {
        // const defaultImageHeight = width * 0.8;
        const difference = height - contentHeight - contentTop + 1;

        return { imageHeight: difference };
    }, [contentTop, contentHeight, width, height]);

    const isVideo = type === 'video';
    const hasOverTitle = isTextFilled(overTitle);
    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);
    const hasSponsor = (sponsors || []).length > 0 && isTextFilled(sponsors[0]);
    const { name: authorFullName } = author || {};
    const hasAuthor = isTextFilled(authorFullName);
    const { url = null, type: imageType = null } = image || {};
    const hasImage = url !== null;

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
    const finalPlaying = playing && current;
    const backgroundPlaying = current && !openedWebView && (isView || isEdit);

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
        <ScreenElement
            key="description"
            empty={
                <div className={styles.emptyContainer}>
                    <Empty className={styles.empty}>
                        <FormattedMessage defaultMessage="Lede" description="Lede placeholder" />
                    </Empty>
                </div>
            }
            isEmpty={!hasDescription && !hasArticle}
        >
            {hasDescription ? (
                <div className={classNames([styles.description])}>
                    <Text className={classNames([styles.lede])} {...description} />
                </div>
            ) : null}
        </ScreenElement>,
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
                        const { body = '' } = sponsor || {};
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
                mediaRef={imageType !== 'video' && hasVideoBackground ? mediaRef : null}
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
                        isEmpty={!hasImage && !hasArticle}
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
                                playing={finalPlaying}
                                muted={muted}
                                withoutVideo={isPreview}
                                mediaRef={mediaRef}
                                autoPlay
                            />
                        ) : null}
                    </ScreenElement>
                </div>
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

UrbaniaArticle.propTypes = propTypes;
UrbaniaArticle.defaultProps = defaultProps;

export default React.memo(UrbaniaArticle);
