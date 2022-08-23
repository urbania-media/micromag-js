/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
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
import { useTrackScreenEvent } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import ShareOptions from '@micromag/element-share-options';

import styles from './share.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    heading: MicromagPropTypes.headingElement,
    shareUrl: PropTypes.string,
    options: PropTypes.objectOf(PropTypes.bool),
    buttonsStyle: MicromagPropTypes.boxStyle,
    buttonsTextStyle: MicromagPropTypes.textStyle,
    centered: PropTypes.bool,
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
    heading: null,
    shareUrl: null,
    options: null,
    buttonsStyle: null,
    buttonsTextStyle: null,
    centered: false,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const ShareScreen = ({
    layout,
    heading,
    shareUrl,
    options,
    buttonsStyle,
    buttonsTextStyle,
    centered,
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

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active;

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const currentUrl = useMemo(() => {
        const origin =
            typeof window !== 'undefined' ? window.location.origin.replace(/\/+$/, '') : '';
        return origin;
    }, []);
    const finalShareURL = shareUrl || currentUrl;

    const defaultOptions =
        options !== null
            ? ['email', 'facebook', 'twitter', 'linkedin', 'whatsapp', 'facebookMessenger']
            : [];
    const selectedOptions =
        options !== null
            ? Object.keys(options).reduce((acc, key) => {
                  if (!options[key]) return acc;
                  return [...acc, key];
              }, [])
            : defaultOptions;

    const trackingEnabled = isView;
    const trackEvent = useTrackScreenEvent('share');
    const onClickShare = useCallback(
        (type) => {
            if (trackingEnabled) {
                trackEvent('click_share', type, {
                    shareUrl,
                });
            }
        },
        [trackEvent],
    );

    // Create elements
    const items = [
        <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={<FormattedMessage defaultMessage="Heading" description="Heading placeholder" />}
            emptyClassName={styles.emptyHeading}
            isEmpty={!heading || heading?.body === ''}
        >
            {heading ? <Heading className={classNames([styles.heading])} {...heading} /> : null}
        </ScreenElement>,

        <Spacer key="spacer" size={5} />,

        <ScreenElement
            key="share-options"
            placeholder="share-options"
            emptyLabel={
                <FormattedMessage defaultMessage="Share options" description="Title placeholder" />
            }
            emptyClassName={styles.emptyOptions}
            isEmpty={!options}
        >
            <ShareOptions
                className={classNames([styles.shareOptions, { [styles.isCentered]: centered }])}
                labelClassName={styles.shareLabel}
                url={finalShareURL}
                options={selectedOptions}
                onShare={onClickShare}
                buttonsStyle={buttonsStyle}
                buttonsTextStyle={buttonsTextStyle}
            />
        </ScreenElement>,

        !isPlaceholder && hasCallToAction ? (
            <div
                style={{
                    paddingTop: spacing,
                    paddingLeft: Math.max(viewerBottomSidesWidth - spacing, 0),
                    paddingRight: Math.max(viewerBottomSidesWidth - spacing, 0),
                }}
                key="call-to-action"
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
                />
            ) : null}
            <Container width={width} height={height}>
                <Layout
                    className={styles.layout}
                    verticalAlign={layout}
                    fullscreen
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop: (!isPreview ? viewerTopHeight : 0) + spacing,
                                  paddingBottom: (!isPreview ? viewerBottomHeight : 0) + spacing,
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

ShareScreen.propTypes = propTypes;
ShareScreen.defaultProps = defaultProps;

export default React.memo(ShareScreen);
