/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { FormattedMessage } from 'react-intl';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Layout, { Spacer } from '@micromag/element-layout';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import ShareOptions from '@micromag/element-share-options';
// import Text from '@micromag/element-text';
import styles from './styles.module.scss';

const propTypes = {
    // layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    // text: MicromagPropTypes.textElement,
    heading: MicromagPropTypes.headingElement,
    // @todo
    options: PropTypes.any, // eslint-disable-line
    // withTitle: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    enableInteraction: PropTypes.func,
    disableInteraction: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    // layout: 'top',
    // text: null,
    heading: null,
    options: null,
    // withTitle: false,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 100,
    enableInteraction: null,
    disableInteraction: null,
    className: null,
};

const ShareScreen = ({
    // layout,
    // text,
    heading,
    options,
    // withTitle,
    spacing,
    background,
    callToAction,
    current,
    active,
    transitions,
    transitionStagger,
    enableInteraction,
    disableInteraction,
    className,
}) => {
    // console.log({heading, options}); // eslint-disable-line
    const { width, height, menuOverScreen, resolution } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasTitle = isTextFilled(heading);

    // const isSplitted = layout === 'split';
    // const isTopLayout = layout === 'top';
    // const isMiddleLayout = layout === 'middle';
    // const verticalAlign = isSplitted ? null : layout;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active;

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    // Create elements
    const items = [
        hasTitle ? (
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
                            styles.heading,
                        ])}
                        body={heading}
                    />
                ) : null}
            </ScreenElement>
        ) : null,

        <ShareOptions
            className={styles.shareOptions}
            title="LOREM IPSUM"
            url="this is the url"
            // focusable={opened}
            // onShare={onShare}
            // onClose={onCancel}
        />,

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
                    fullscreen
                    style={
                        !isPlaceholder
                            ? {
                                  padding: spacing,
                                  paddingTop:
                                      (menuOverScreen && !isPreview ? menuSize : 0) + spacing,
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
