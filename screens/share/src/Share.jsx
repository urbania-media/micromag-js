/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { FormattedMessage } from 'react-intl';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer, useViewerInteraction } from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Layout, { Spacer } from '@micromag/element-layout';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import ShareOptions from '@micromag/element-share-options';
import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom']),
    heading: MicromagPropTypes.headingElement,
    shareUrl: PropTypes.string,
    options: PropTypes.any, // eslint-disable-line
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
    const { topHeight: viewerTopHeight } = useViewer();
    const { enableInteraction, disableInteraction } = useViewerInteraction();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

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

    const defaultOptions = options === true
        ? ['email', 'facebook', 'twitter', 'linkedin']
        : [];
    const selectedOptions = options !== null
        ? Object.keys(options).reduce((acc, key) => {
            if (!options[key]) return acc;
            return [...acc, key];
        }, [])
        : defaultOptions;

    // Create elements
    const items = [
        <ScreenElement
            key="title"
            placeholder="title"
            emptyLabel={
                <FormattedMessage defaultMessage="Title" description="Title placeholder" />
            }
            emptyClassName={styles.emptyHeading}
            isEmpty={!heading}
        >
            {heading ? (
                <Heading
                    className={classNames([
                        styles.heading,
                    ])}
                    {...heading}
                />
            ) : null}
        </ScreenElement>,

        <Spacer size={20} />,

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
                className={classNames([
                    styles.shareOptions,
                    { [styles.isCentered]: centered },
                ])}
                labelClassName={styles.shareLabel}
                url={finalShareURL}
                options={selectedOptions}
            />
        </ScreenElement>,

        !isPlaceholder && hasCallToAction ? (
            <div style={{ margin: -spacing, marginTop: 0 }} key="call-to-action">
                <CallToAction
                    callToAction={callToAction}
                    animationDisabled={isPreview}
                    focusable={current && isView}
                    screenSize={{ width, height }}
                    enableInteraction={enableInteraction}
                    disableInteraction={disableInteraction}
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
                    shouldLoad={backgroundShouldLoad}
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
                                  paddingTop:
                                      (!isPreview ? viewerTopHeight : 0) + spacing,
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
