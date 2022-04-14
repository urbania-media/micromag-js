/* eslint-disable no-param-reassign */

/* eslint-disable react/jsx-props-no-spreading */
// import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
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
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Visual from '@micromag/element-visual';
import Author from './Author';
import styles from './styles.module.scss';

const propTypes = {
    image: MicromagPropTypes.visualElement,
    title: MicromagPropTypes.headingElement,
    overTitle: MicromagPropTypes.headingElement,
    authors: PropTypes.arrayOf(PropTypes.shape({})),
    sponsors: PropTypes.arrayOf(PropTypes.shape({})),
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
    image: null,
    title: null,
    overTitle: null,
    authors: null,
    sponsors: null,
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
    image,
    title,
    overTitle,
    authors,
    sponsors,
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
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const { body: overTitleText = null } = overTitle || {};
    const hasOverTitle = overTitleText !== null;

    const { body: titleText = null } = overTitle || {};
    const hasTitle = titleText !== null;

    const hasAuthors = (authors || []).length > 0;
    const hasSponsors = (sponsors || []).length > 0;

    const { url = null } = image || {};
    const hasImage = url !== null;

    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;
    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    console.log(authors);

    const items = [
        <ScreenElement
            key="overTitle"
            placeholder={<PlaceholderSubtitle className={styles.placeholder} />}
            empty={
                <div className={styles.emptyContainer}>
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
            isEmpty={!hasOverTitle}
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
            isEmpty={!hasAuthors}
        >
            {hasAuthors ? (
                <div className={classNames([styles.authors])}>
                    {authors.map((author) => (
                        <Author author={author} />
                    ))}
                </div>
            ) : null}
        </ScreenElement>,
        <ScreenElement
            key="sponsors"
            empty={
                <div className={styles.emptyContainer}>
                    <Empty className={styles.empty}>
                        <FormattedMessage
                            defaultMessage="Sponsors"
                            description="Sponsors placeholder"
                        />
                    </Empty>
                </div>
            }
            isEmpty={!hasSponsors}
        >
            {hasSponsors ? (
                <div className={classNames([styles.sponsors])}>
                    <FormattedMessage defaultMessage="Presented by" description="Sponsor label" />
                    <span>Sponsors</span>
                </div>
            ) : null}
        </ScreenElement>,
    ];

    console.log('image', image);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
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
                    style={{ paddingTop: spacing }}
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
                            {hasImage ? (
                                <Visual
                                    className={styles.image}
                                    media={image}
                                    width={width}
                                    height={width * 0.8}
                                    objectFit={{ fit: 'cover' }}
                                />
                            ) : null}
                            {!isPlaceholder && hasCallToAction ? (
                                <div key="call-to-action">
                                    <CallToAction
                                        className={styles.callToAction}
                                        callToAction={callToAction}
                                        animationDisabled={isPreview}
                                        focusable={current && isView}
                                        screenSize={{ width, height }}
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
