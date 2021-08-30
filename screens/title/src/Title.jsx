/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout, { Spacer } from '@micromag/element-layout';
import Heading from '@micromag/element-heading';
import Text from '@micromag/element-text';
import CallToAction from '@micromag/element-call-to-action';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split', 'split-top', 'split-bottom']),
    title: MicromagPropTypes.headingElement,
    subtitle: MicromagPropTypes.headingElement,
    description: MicromagPropTypes.textElement,
    withSubtitle: PropTypes.bool,
    withDescription: PropTypes.bool,
    spacing: PropTypes.number,
    descriptionEmptyLabel: MicromagPropTypes.label,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    title: null,
    subtitle: null,
    description: null,
    withSubtitle: false,
    withDescription: false,
    spacing: 20,
    descriptionEmptyLabel: (
        <FormattedMessage defaultMessage="Description" description="Description placeholder" />
    ),
    background: null,
    callToAction: null,
    current: true,
    transitions: null,
    transitionStagger: 100,
    className: null,
};

const TitleScreen = ({
    layout,
    title,
    subtitle,
    description,
    withSubtitle,
    withDescription,
    spacing,
    descriptionEmptyLabel,
    background,
    callToAction,
    current,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();

    const {
        isView,
        isPreview,
        isPlaceholder,
        isEdit,
        isStatic,
        isCapture,
    } = useScreenRenderContext();

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

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    // Create elements
    const items = [
        !isPlaceholder && hasCallToAction && isMiddleLayout ? (
            <Spacer key="spacer-cta-top" />
        ) : null,
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
        </ScreenElement>,
        isSplitted && (!withDescription || verticalAlign === 'bottom') && <Spacer key="spacer1" />,

        withSubtitle && (
            <ScreenElement
                key="subtitle"
                placeholder="subtitle"
                emptyLabel={
                    <FormattedMessage
                        defaultMessage="Subtitle"
                        description="Subtitle placeholder"
                    />
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
        ),

        isSplitted && withDescription && verticalAlign === 'top' && <Spacer key="spacer2" />,

        withDescription && (
            <ScreenElement
                key="description"
                placeholder="shortText"
                emptyLabel={descriptionEmptyLabel}
                emptyClassName={styles.emptyDescription}
                isEmpty={!hasDescription}
            >
                {hasDescription ? <Text {...description} /> : null}
            </ScreenElement>
        ),
        !isPlaceholder && hasCallToAction && (isTopLayout || isMiddleLayout) ? (
            <Spacer key="spacer-cta-bottom" />
        ) : null,
        !isPlaceholder && hasCallToAction ? (
            <div style={{ margin: -spacing, marginTop: 0 }} key="call-to-action">
                <CallToAction
                    callToAction={callToAction}
                    animationDisabled={isPreview}
                />
            </div>
        ) : null,
    ];

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
                    {...background}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
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
                                  paddingTop: (menuOverScreen && !isPreview ? menuSize : 0) + spacing,
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

TitleScreen.propTypes = propTypes;
TitleScreen.defaultProps = defaultProps;

export default React.memo(TitleScreen);
