/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerContext,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import {
    isTextFilled,
    getStyleFromBox,
    isHeaderFilled,
    isFooterFilled,
    getFooterProps,
} from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Footer from '@micromag/element-footer';
import Header from '@micromag/element-header';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';

import styles from './title.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split', 'split-top', 'split-bottom']),
    title: MicromagPropTypes.headingElement,
    subtitle: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.textElement,
    boxStyle: MicromagPropTypes.boxStyle,
    withSubtitle: PropTypes.bool,
    withDescription: PropTypes.bool,
    withBox: PropTypes.bool,
    spacing: PropTypes.number,
    descriptionEmptyLabel: MicromagPropTypes.label,
    header: MicromagPropTypes.header,
    footer: MicromagPropTypes.footer,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    title: null,
    subtitle: null,
    description: null,
    boxStyle: null,
    withSubtitle: false,
    withDescription: false,
    withBox: false,
    spacing: 20,
    descriptionEmptyLabel: (
        <FormattedMessage defaultMessage="Description" description="Description placeholder" />
    ),
    header: null,
    footer: null,
    background: null,
    current: true,
    active: true,
    transitionStagger: 100,
    className: null,
};

const TitleScreen = ({
    layout,
    title,
    subtitle,
    description,
    boxStyle,
    withSubtitle,
    withDescription,
    withBox, // eslint-disable-line
    spacing,
    descriptionEmptyLabel,
    header,
    footer,
    background,
    current,
    active,
    className,
}) => {
    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const hasTitle = isTextFilled(title);
    const hasSubtitle = isTextFilled(subtitle);
    const hasDescription = isTextFilled(description);

    const layoutParts = layout.split('-');
    const isSplitted = layoutParts[0] === 'split';
    const isTopLayout = layout === 'top';
    const isMiddleLayout = layout === 'middle';
    const isBottomLayout = layout === 'bottom';
    const verticalAlign = isSplitted ? layoutParts[1] || null : layoutParts[0];

    const titleWithMargin =
        hasTitle && (hasSubtitle || hasDescription) && (!isSplitted || verticalAlign === 'top');
    const subtitleWithMargin =
        hasSubtitle && hasDescription && (!isSplitted || verticalAlign === 'bottom');

    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active;

    const hasHeader = isHeaderFilled(header);
    const hasFooter = isFooterFilled(footer);
    const footerProps = getFooterProps(footer, { isView, current, openWebView, isPreview });

    const titleElement = (
        <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Title placeholder" />}
            emptyClassName={styles.emptyTitle}
            isEmpty={!hasTitle}
        >
            {hasTitle ? (
                <Heading
                    className={classNames([styles.title, { [styles.withMargin]: titleWithMargin }])}
                    {...title}
                    size={1}
                />
            ) : null}
        </ScreenElement>
    );

    const subtitleElement = withSubtitle ? (
        <ScreenElement
            key="subtitle"
            placeholder="subtitle"
            emptyLabel={
                <FormattedMessage defaultMessage="Subtitle" description="Subtitle placeholder" />
            }
            emptyClassName={styles.emptySubtitle}
            isEmpty={!hasSubtitle}
        >
            {hasSubtitle ? (
                <Heading
                    className={classNames([
                        styles.subtitle,
                        { [styles.withMargin]: subtitleWithMargin },
                    ])}
                    {...subtitle}
                    size={2}
                />
            ) : null}
        </ScreenElement>
    ) : null;

    const descriptionElement = withDescription ? (
        <ScreenElement
            key="description"
            placeholder="shortText"
            emptyLabel={descriptionEmptyLabel}
            emptyClassName={styles.emptyDescription}
            isEmpty={!hasDescription}
        >
            {hasDescription ? <Text {...description} /> : null}
        </ScreenElement>
    ) : null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready
        >
            <Container width={width} height={height} className={styles.content}>
                <Layout
                    className={styles.layout}
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (!isPreview ? viewerTopHeight : 0) +
                                      (hasHeader ? spacing / 2 : spacing),
                                  paddingBottom:
                                      (current && !isPreview ? viewerBottomHeight : 0) +
                                      (hasFooter ? spacing / 2 : spacing),
                              }
                            : null
                    }
                >
                    {!isPlaceholder && hasHeader ? (
                        <div
                            style={{
                                paddingBottom: spacing,
                            }}
                        >
                            <Header {...header} />
                        </div>
                    ) : null}

                    {!isPlaceholder && hasFooter && isMiddleLayout ? (
                        <Spacer key="spacer-cta-top" />
                    ) : null}

                    {!isPlaceholder && hasHeader && isBottomLayout ? (
                        <Spacer key="spacer-cta-top" />
                    ) : null}

                    {!isPlaceholder && hasHeader && !hasFooter && isMiddleLayout ? (
                        <Spacer key="spacer-cta-top" />
                    ) : null}

                    {withBox && !isSplitted ? (
                        <div
                            className={styles.box}
                            style={
                                isEdit || isPlaceholder || hasTitle || hasSubtitle || hasDescription
                                    ? getStyleFromBox(boxStyle)
                                    : null
                            }
                        >
                            {[titleElement, subtitleElement, descriptionElement]}
                        </div>
                    ) : null}

                    {withBox && isSplitted ? (
                        <>
                            <div
                                className={styles.box}
                                key="top"
                                style={
                                    isEdit ||
                                    isPlaceholder ||
                                    hasTitle ||
                                    (withDescription && verticalAlign === 'top' && hasSubtitle)
                                        ? getStyleFromBox(boxStyle)
                                        : null
                                }
                            >
                                {titleElement}
                                {withDescription && verticalAlign === 'top'
                                    ? subtitleElement
                                    : null}
                            </div>
                            <Spacer key="spacer1" />
                            <div
                                className={styles.box}
                                key="bottom"
                                style={
                                    isEdit ||
                                    isPlaceholder ||
                                    hasDescription ||
                                    ((!withDescription || verticalAlign === 'bottom') &&
                                        hasSubtitle)
                                        ? getStyleFromBox(boxStyle)
                                        : null
                                }
                            >
                                {!withDescription || verticalAlign === 'bottom'
                                    ? subtitleElement
                                    : null}
                                {descriptionElement}
                            </div>
                        </>
                    ) : null}

                    {!withBox ? (
                        <>
                            {titleElement}
                            {isSplitted && (!withDescription || verticalAlign === 'bottom') && (
                                <Spacer key="spacer1" />
                            )}
                            {subtitleElement}
                            {isSplitted && withDescription && verticalAlign === 'top' && (
                                <Spacer key="spacer2" />
                            )}
                            {descriptionElement}
                        </>
                    ) : null}

                    {!isPlaceholder && hasFooter && (isTopLayout || isMiddleLayout) ? (
                        <Spacer key="spacer-cta-bottom" />
                    ) : null}

                    {!isPlaceholder && hasHeader && !hasFooter && isMiddleLayout ? (
                        <Spacer key="spacer-cta-bottom" />
                    ) : null}

                    {!isPlaceholder && hasFooter ? (
                        <div
                            key="call-to-action"
                            style={{
                                paddingTop: spacing,
                                paddingLeft: Math.max(0, viewerBottomSidesWidth - spacing),
                                paddingRight: Math.max(0, viewerBottomSidesWidth - spacing),
                            }}
                        >
                            <Footer {...footerProps} />
                        </div>
                    ) : null}
                </Layout>
            </Container>
            {!isPlaceholder ? (
                <Background
                    background={background}
                    width={width}
                    height={height}
                    resolution={resolution}
                    playing={backgroundPlaying}
                    muted={muted}
                    shouldLoad={backgroundShouldLoad}
                    mediaRef={mediaRef}
                    withoutVideo={isPreview}
                    className={styles.background}
                />
            ) : null}
        </div>
    );
};

TitleScreen.propTypes = propTypes;
TitleScreen.defaultProps = defaultProps;

export default TitleScreen;
