/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
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
    category: MicromagPropTypes.headingElement,
    date: MicromagPropTypes.textElement,
    title: MicromagPropTypes.headingElement,
    sponsor: MicromagPropTypes.textElement,
    description: MicromagPropTypes.textElement,
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
    category: null,
    date: null,
    title: null,
    sponsor: null,
    description: null,
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
    category,
    date,
    title,
    sponsor,
    description,
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

    const hasCategory = isTextFilled(category);
    const hasDate = isTextFilled(date);
    const hasTitle = isTextFilled(title);
    const hasSponsor = isTextFilled(sponsor);
    const hasDescription = isTextFilled(description);

    const onlyCategory = hasCategory && !hasDate && !hasTitle && !hasSponsor && !hasDescription;

    const hasTextCard = hasCategory || hasDate || hasTitle || hasSponsor || hasDescription;

    // const titleWithMargin = hasTitle && hasText;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    useMemo(() => {
        console.log(
            `hasCategory: ${hasCategory}, hasDate: ${hasDate}, hasTitle ${hasTitle}, hasSponsor: ${hasSponsor}, hasDescription: ${hasDescription}, hasTextCard: ${hasTextCard}`,
        );
    }, [hasCategory, hasDate, hasTitle, hasSponsor, hasDescription, hasTextCard]);

    // Create elements
    const items = [
        !isPlaceholder && hasCallToAction ? <Spacer key="spacer-cta-top" /> : null,
        <Spacer key="spacer-cta-top" />,
        hasTextCard ? (
            <Container className={styles.textCard} style={{ border: '1px solid red' }}>
                {/* // CATEGORY */}
                {hasCategory ? (
                    <ScreenElement
                        key="category"
                        placeholder="text"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Category"
                                description="Text placeholder"
                            />
                        }
                        emptyClassName={styles.emptyText}
                        isEmpty={!hasCategory}
                    >
                        <Heading
                            className={classNames([
                                styles.category,
                                {
                                    [className]: className !== null,
                                    [styles.noBottomBorder]: onlyCategory,
                                },
                            ])}
                            {...category}
                        />
                    </ScreenElement>
                ) : null}
                {hasDate || hasTitle ? (
                    <div
                        className={classNames([
                            styles.dateTitleRow,
                            {
                                [className]: className !== null,
                                [styles.bottomBorder]:
                                    hasSponsor || (!hasSponsor && hasDescription),
                            },
                        ])}
                    >
                        {/* // DATE */}
                        {hasDate ? (
                            <ScreenElement
                                key="date"
                                placeholder="text"
                                emptyLabel={
                                    <FormattedMessage
                                        defaultMessage="Date"
                                        description="Text placeholder"
                                    />
                                }
                                emptyClassName={styles.emptyText}
                                isEmpty={!hasDate}
                            >
                                <Text
                                    className={classNames([
                                        styles.date,
                                        {
                                            [className]: className !== null,
                                            [styles.rightBorder]: hasTitle,
                                        },
                                    ])}
                                    {...date}
                                />
                            </ScreenElement>
                        ) : null}
                        {/* // TITLE */}
                        <ScreenElement
                            key="title"
                            placeholder="title"
                            emptyLabel={
                                <FormattedMessage
                                    defaultMessage="Title"
                                    description="Title placeholder"
                                />
                            }
                            emptyClassName={styles.emptyTitle}
                            isEmpty={!hasTitle}
                        >
                            <Heading
                                // className={classNames([styles.title, { [styles.withMargin]: titleWithMargin }])}
                                className={styles.title}
                                {...title}
                            />
                        </ScreenElement>
                    </div>
                ) : null}
                {/* // SPONSOR */}
                {hasSponsor ? (
                    <ScreenElement
                        key="sponsor"
                        placeholder="text"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Sponsor"
                                description="Text placeholder"
                            />
                        }
                        emptyClassName={styles.emptyText}
                        isEmpty={!hasSponsor}
                    >
                        <Text
                            className={classNames([
                                styles.sponsor,
                                {
                                    [className]: className !== null,
                                    [styles.bottomBorder]: hasDescription,
                                },
                            ])}
                            {...sponsor}
                        />
                    </ScreenElement>
                ) : null}

                {/* // DESCRIPTION */}
                {hasDescription ? (
                    <ScreenElement
                        key="description"
                        placeholder="text"
                        emptyLabel={
                            <FormattedMessage
                                defaultMessage="Description"
                                description="Text placeholder"
                            />
                        }
                        emptyClassName={styles.emptyText}
                        isEmpty={!hasDescription}
                    >
                        <Text className={styles.description} {...description} />
                    </ScreenElement>
                ) : null}
            </Container>
        ) : null,
        !isPlaceholder && hasCallToAction ? <Spacer key="spacer-cta-bottom" /> : null,
        <Spacer key="spacer-cta-bottom" />,
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

Recommendation.defaultProps = defaultProps;

export default React.memo(Recommendation);
