/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { isTextFilled, getStyleFromBox } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';
import styles from './styles.module.scss';

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
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
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
    background,
    callToAction,
    current,
    active,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height, menuOverScreen, resolution } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasTitle = isTextFilled(title);
    const hasSubtitle = isTextFilled(subtitle);
    const hasDescription = isTextFilled(description);

    const layoutParts = layout.split('-');
    const isSplitted = layoutParts[0] === 'split';
    const isTopLayout = layout === 'top';
    const isMiddleLayout = layout === 'middle';
    const verticalAlign = isSplitted ? layoutParts[1] || null : layoutParts[0];

    const titleWithMargin =
        hasTitle && (hasSubtitle || hasDescription) && (!isSplitted || verticalAlign === 'top');
    const subtitleWithMargin =
        hasSubtitle && hasDescription && (!isSplitted || verticalAlign === 'bottom');

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;

    const hasCallToAction = callToAction !== null && callToAction.active === true;

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
                    verticalAlign={verticalAlign}
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
                    {!isPlaceholder && hasCallToAction && isMiddleLayout ? (
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
                            <TransitionsStagger
                                transitions={transitions}
                                stagger={transitionStagger}
                                disabled={transitionDisabled}
                                playing={transitionPlaying}
                                focusable={current && isView}
                            >
                                {[titleElement, subtitleElement, descriptionElement]}
                            </TransitionsStagger>
                        </div>
                    ) : null}

                    {withBox && isSplitted ? (
                        <TransitionsStagger
                            transitions={transitions}
                            stagger={transitionStagger}
                            disabled={transitionDisabled}
                            playing={transitionPlaying}
                            focusable={current && isView}
                        >
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
                        </TransitionsStagger>
                    ) : null}

                    {!withBox ? (
                        <TransitionsStagger
                            transitions={transitions}
                            stagger={transitionStagger}
                            disabled={transitionDisabled}
                            playing={transitionPlaying}
                            focusable={current && isView}
                        >
                            {titleElement}
                            {isSplitted && (!withDescription || verticalAlign === 'bottom') && (
                                <Spacer key="spacer1" />
                            )}
                            {subtitleElement}
                            {isSplitted && withDescription && verticalAlign === 'top' && (
                                <Spacer key="spacer2" />
                            )}
                            {descriptionElement}
                        </TransitionsStagger>
                    ) : null}

                    {!isPlaceholder && hasCallToAction && (isTopLayout || isMiddleLayout) ? (
                        <Spacer key="spacer-cta-bottom" />
                    ) : null}

                    {!isPlaceholder && hasCallToAction ? (
                        <div style={{ margin: -spacing, marginTop: 0 }} key="call-to-action">
                            <CallToAction
                                callToAction={callToAction}
                                animationDisabled={isPreview}
                                focusable={current && isView}
                                screenSize={{ width, height }}
                            />
                        </div>
                    ) : null}
                </Layout>
            </Container>
        </div>
    );
};

TitleScreen.propTypes = propTypes;
TitleScreen.defaultProps = defaultProps;

export default React.memo(TitleScreen);
