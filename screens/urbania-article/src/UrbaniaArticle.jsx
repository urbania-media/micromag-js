/* eslint-disable no-param-reassign */

/* eslint-disable react/jsx-props-no-spreading */
// import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    Transitions,
    ScreenElement,
    Empty,
    PlaceholderImage,
    PlaceholderSubtitle,
    PlaceholderTitle,
} from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext, // useViewerNavigation,
} from '@micromag/core/contexts';
import { useResizeObserver } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import UrbaniaAuthor from '@micromag/element-urbania-author';
import Visual from '@micromag/element-visual';
import ArrowIcon from './icons/ArrowIcon';
import WatchIcon from './icons/WatchIcon';
import styles from './styles.module.scss';

const propTypes = {
    type: PropTypes.oneOf(['article', 'video']),
    video: MicromagPropTypes.videoElement,
    image: MicromagPropTypes.visualElement,
    title: MicromagPropTypes.headingElement,
    overTitle: MicromagPropTypes.headingElement,
    authors: PropTypes.arrayOf(PropTypes.shape({})),
    author: MicromagPropTypes.authorElement,
    sponsor: PropTypes.arrayOf(PropTypes.shape({})),
    sponsorPrefix: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
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
    type: null,
    video: null,
    image: null,
    title: null,
    overTitle: null,
    authors: null,
    author: null,
    sponsor: null,
    sponsorPrefix: null,
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
    type,
    video,
    image,
    title,
    overTitle,
    authors,
    author,
    sponsor,
    sponsorPrefix,
    site,
    background,
    callToAction,
    current,
    active,
    transitions,
    spacing,
    className,
}) => {
    const { width, height } = useScreenSize();
    const {
        ref: contentRef,
        entry: { contentRect },
    } = useResizeObserver();
    const { height: contentHeight, top: contentTop } = contentRect || {};

    const { minContentHeight = null, imageHeight } = useMemo(() => {
        const defaultHeight = width * 0.8; // Think about this
        const difference = height - contentHeight - contentTop;
        if (difference > defaultHeight) {
            return { imageHeight: difference };
        }
        return { imageHeight: difference };
    }, [contentTop, contentHeight, width, height]);

    // const { media: currentVideo = null } = video || {};
    // console.log('cv', type, currentVideo, video);

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const isVideo = type === 'video';

    const { body: overTitleText = null } = overTitle || {};
    const hasOverTitle = overTitleText !== null;

    const { body: titleText = null } = title || {};
    const hasTitle = titleText !== null;

    const { body: sponsorText = null } = sponsor || {};
    const hasSponsor = sponsorText !== null;

    const hasAuthors = (authors || []).length > 0 || author !== null;
    const { name: authorFullName } = author || {};
    const { body: authorName } = authorFullName || {};

    console.log('author', author, authors);

    const { url = null } = image || {};
    const hasImage = url !== null;

    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;
    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const hasCallToAction = callToAction !== null && callToAction.active === true;

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
        !isVideo ? (
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
                isEmpty={!hasAuthors}
            >
                {hasAuthors ? (
                    <div className={classNames([styles.authors])}>
                        {author !== null && authorName !== null ? (
                            <UrbaniaAuthor author={author} />
                        ) : (
                            (authors || []).map((a) => <UrbaniaAuthor author={a} />)
                        )}
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
            isEmpty={!hasSponsor}
        >
            {hasSponsor ? (
                <div className={styles.sponsors}>
                    {sponsorPrefix !== null ? (
                        <span className={styles.sponsor}>{sponsorPrefix}</span>
                    ) : null}
                    &nbsp;
                    <Heading className={styles.sponsor} size="6" {...sponsor} />
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
                    [styles.isVideo]: isVideo,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready={isStatic || isCapture}
        >
            <Background
                background={background}
                width={width}
                height={height}
                playing={backgroundPlaying}
                shouldLoad={backgroundShouldLoad}
            />
            <Container className={styles.inner} width={width} height={height}>
                <div
                    className={classNames([
                        styles.content,
                        {
                            [styles[`${site}`]]: site !== null,
                        },
                    ])}
                    style={{ paddingTop: spacing, minHeight: minContentHeight }}
                    ref={contentRef}
                >
                    {items}
                </div>
                <div className={styles.visual}>
                    <Transitions
                        playing={transitionPlaying}
                        transitions={transitions}
                        disabled={transitionDisabled}
                    >
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
                                    media={image}
                                    width={width}
                                    height={imageHeight}
                                    objectFit={{ fit: 'cover' }}
                                />
                            ) : null}
                            {hasImage && isVideo ? (
                                <Visual
                                    className={styles.video}
                                    media={image}
                                    width={width}
                                    height={height}
                                    objectFit={{ fit: 'cover' }}
                                />
                            ) : null}
                            {!isPlaceholder && hasCallToAction ? (
                                <div key="call-to-action">
                                    <CallToAction
                                        className={styles.callToAction}
                                        buttonClassName={styles.button}
                                        labelClassName={styles.label}
                                        arrowClassName={styles.arrow}
                                        callToAction={callToAction}
                                        animationDisabled={isPreview}
                                        focusable={current && isView}
                                        screenSize={{ width, height }}
                                        arrow={<ArrowIcon />}
                                        icon={type === 'video' ? <WatchIcon /> : null}
                                    />
                                </div>
                            ) : null}
                        </ScreenElement>
                    </Transitions>
                </div>
            </Container>
        </div>
    );
};

UrbaniaArticle.propTypes = propTypes;
UrbaniaArticle.defaultProps = defaultProps;

export default React.memo(UrbaniaArticle);
