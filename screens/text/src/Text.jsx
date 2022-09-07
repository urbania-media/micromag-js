/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import {
    useScreenSize,
    useScreenRenderContext,
    useViewerContext,
    useViewerWebView,
    usePlaybackContext,
    usePlaybackMediaRef,
} from '@micromag/core/contexts';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';

import styles from './text.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    text: MicromagPropTypes.textElement,
    title: MicromagPropTypes.headingElement,
    withTitle: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    text: null,
    title: null,
    withTitle: false,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const TextScreen = ({
    layout,
    text,
    title,
    withTitle,
    spacing,
    background,
    callToAction,
    current,
    active,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height, resolution } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const {
        topHeight: viewerTopHeight,
        bottomHeight: viewerBottomHeight,
        bottomSidesWidth: viewerBottomSidesWidth,
    } = useViewerContext();
    const { open: openWebView } = useViewerWebView();
    const { muted } = usePlaybackContext();
    const mediaRef = usePlaybackMediaRef(current);

    const hasTitle = isTextFilled(title);
    const hasText = isTextFilled(text);

    const isSplitted = layout === 'split';
    const isTopLayout = layout === 'top';
    const isMiddleLayout = layout === 'middle';
    const verticalAlign = isSplitted ? null : layout;

    const titleWithMargin = hasTitle && hasText && !isSplitted;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active;

    const { active: hasCallToAction = false } = callToAction || {};

    // Create elements
    const items = [
        !isPlaceholder && hasCallToAction && isMiddleLayout ? (
            <Spacer key="spacer-cta-top" />
        ) : null,
        withTitle ? (
            <ScreenElement
                key="title"
                placeholder="title"
                emptyLabel={
                    <FormattedMessage defaultMessage="Title" description="Title placeholder" />
                }
                emptyClassName={styles.emptyTitle}
                isEmpty={!hasTitle}
            >
                {hasTitle ? (
                    <Heading
                        className={classNames([
                            styles.title,
                            { [styles.withMargin]: titleWithMargin },
                        ])}
                        {...title}
                    />
                ) : null}
            </ScreenElement>
        ) : null,

        isSplitted && withTitle ? <Spacer key="spacer" /> : null,

        <ScreenElement
            key="description"
            placeholder="text"
            emptyLabel={<FormattedMessage defaultMessage="Text" description="Text placeholder" />}
            emptyClassName={styles.emptyText}
            isEmpty={!hasText}
        >
            {hasText ? <Text className={styles.text} {...text} /> : null}
        </ScreenElement>,
        !isPlaceholder && hasCallToAction && (isTopLayout || isMiddleLayout) ? (
            <Spacer key="spacer-cta-bottom" />
        ) : null,
        !isPlaceholder && hasCallToAction ? (
            <div
                key="call-to-action"
                style={{
                    paddingTop: spacing,
                    paddingLeft: Math.max(0, viewerBottomSidesWidth - spacing),
                    paddingRight: Math.max(0, viewerBottomSidesWidth - spacing),
                }}
            >
                <CallToAction
                    {...callToAction}
                    animationDisabled={isPreview}
                    focusable={current && isView}
                    openWebView={openWebView}
                />
            </div>
        ) : null,
    ].filter((el) => el !== null);

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
                />
            ) : null}
            <Container width={width} height={height}>
                <Layout
                    className={styles.layout}
                    fullscreen
                    verticalAlign={verticalAlign}
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (current && !isPreview ? viewerTopHeight : 0) + spacing,
                                  paddingBottom: (current && !isPreview ? viewerBottomHeight : 0) + spacing,
                              }
                            : null
                    }
                >
                    <TransitionsStagger
                        transitions={transitions}
                        stagger={transitionStagger}
                        disabled={transitionDisabled}
                        playing={transitionPlaying}
                    >
                        {items}
                    </TransitionsStagger>
                </Layout>
            </Container>
        </div>
    );
};

TextScreen.propTypes = propTypes;
TextScreen.defaultProps = defaultProps;

export default React.memo(TextScreen);
