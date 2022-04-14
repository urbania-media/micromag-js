/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout, { Spacer } from '@micromag/element-layout';
import Text from '@micromag/element-text';
import styles from './styles.module.scss';

const propTypes = {
    text: MicromagPropTypes.textElement,
    title: MicromagPropTypes.headingElement,
    category: MicromagPropTypes.textElement,
    date: MicromagPropTypes.textElement,
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
    text: null,
    title: null,
    category: null,
    date: null,
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

const Recommendation = ({
    text,
    title,
    category,
    date,
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
    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasTitle = isTextFilled(title);
    const hasText = isTextFilled(text);

    const titleWithMargin = hasTitle && hasText;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    // Create elements
    const items = [
        !isPlaceholder && hasCallToAction ? <Spacer key="spacer-cta-top" /> : null,
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

        <ScreenElement
            key="description"
            placeholder="text"
            emptyLabel={<FormattedMessage defaultMessage="Text" description="Text placeholder" />}
            emptyClassName={styles.emptyText}
            isEmpty={!hasText}
        >
            {hasText ? <Text className={styles.text} {...text} /> : null}
        </ScreenElement>,

        // CATEGORY
        <ScreenElement
            key="category"
            placeholder="text"
            emptyLabel={
                <FormattedMessage defaultMessage="Category" description="Text placeholder" />
            }
            emptyClassName={styles.emptyText}
            isEmpty={!hasText}
        >
            <Text className={styles.text} {...category} />
        </ScreenElement>,
        // DATE
        <ScreenElement
            key="date"
            placeholder="text"
            emptyLabel={<FormattedMessage defaultMessage="Date" description="Text placeholder" />}
            emptyClassName={styles.emptyText}
            isEmpty={!hasText}
        >
            <Text className={styles.text} {...date} />
        </ScreenElement>,
        !isPlaceholder && hasCallToAction ? <Spacer key="spacer-cta-bottom" /> : null,
        !isPlaceholder && hasCallToAction ? (
            <div style={{ margin: -spacing, marginTop: 0 }} key="call-to-action">
                <CallToAction
                    callToAction={callToAction}
                    animationDisabled={isPreview}
                    focusable={current && isView}
                    screenSize={{ width, height }}
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

Recommendation.propTypes = propTypes;
Recommendation.defaultProps = defaultProps;

export default React.memo(Recommendation);
