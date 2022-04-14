/* eslint-disable no-param-reassign */

/* eslint-disable react/jsx-props-no-spreading */
import { getSizeWithinBounds } from '@folklore/size';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Transitions, ScreenElement, Empty } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext, // useViewerNavigation,
} from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Visual from '@micromag/element-visual';
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
    getMediaRef: PropTypes.func,
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
    getMediaRef: null,
    className: null,
};

const UrbaniaArticleText = ({
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

    const items = [
        <ScreenElement
            key="overTitle"
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
            {hasAuthors ? 'Authors' : null}
        </ScreenElement>,
        <Transitions
            playing={transitionPlaying}
            transitions={transitions}
            disabled={transitionDisabled}
        >
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
                    <Heading className={classNames([styles.title])} {...overTitle} />
                ) : null}
            </ScreenElement>
        </Transitions>,
    ];

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
            <Container width={width} height={height}>
                <div
                    className={classNames([
                        styles.content,
                        {
                            [`${site}`]: site !== null,
                        },
                    ])}
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
                            <Visual />
                        </ScreenElement>
                    </Transitions>
                </div>
            </Container>
        </div>
    );
};

UrbaniaArticleText.propTypes = propTypes;
UrbaniaArticleText.defaultProps = defaultProps;

export default React.memo(UrbaniaArticleText);
