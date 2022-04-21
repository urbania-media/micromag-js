/* eslint-disable react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import {
    PlaceholderText,
    PlaceholderTitle,
    ScreenElement,
    TransitionsStagger,
} from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { useTrackScreenEvent } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import styles from './styles.module.scss';

const propTypes = {
    category: MicromagPropTypes.headingElement,
    title: MicromagPropTypes.headingElement,
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
    title: null,
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

const Horoscope = ({
    category,
    title,
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
    const trackScreenEvent = useTrackScreenEvent();

    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasCategory = isTextFilled(category);
    const hasTitle = isTextFilled(title);
    const hasDescription = isTextFilled(description);

    const onlyCategory = hasCategory && !hasTitle && !hasDescription;

    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    const [scrolledBottom, setScrolledBottom] = useState(false);

    const onScrolledBottom = useCallback(
        ({ initial }) => {
            if (initial) {
                trackScreenEvent('scroll', 'Screen');
            }
            setScrolledBottom(true);
        },
        [trackScreenEvent],
    );

    const onScrolledNotBottom = useCallback(() => {
        setScrolledBottom(false);
    }, [setScrolledBottom]);

    // Create elements
    const items = [
        // !isPlaceholder ? <Spacer key="spacer-cta-top" /> : null,

        <ScreenElement
            key="title"
            placeholder={<PlaceholderTitle className={styles.categoryPlaceholder} />}
            emptyLabel={<FormattedMessage defaultMessage="Title" description="Title placeholder" />}
            emptyClassName={styles.emptyText}
            isEmpty={!hasCategory}
        >
            <Heading
                className={classNames([
                    styles.title,
                    {
                        [className]: className !== null,
                        [styles.noBottomBorder]: onlyCategory,
                    },
                ])}
                {...title}
            />
        </ScreenElement>,

        <ScreenElement
            key="description"
            placeholder={<PlaceholderText className={styles.descriptionPlaceholder} />}
            emptyLabel={
                <FormattedMessage defaultMessage="Description" description="Text placeholder" />
            }
            emptyClassName={styles.emptyText}
            isEmpty={!hasDescription}
        >
            {hasDescription ? <Text className={styles.description} {...description} /> : null}
        </ScreenElement>,

        // !isPlaceholder ? <Spacer key="spacer-cta-bottom" /> : null,
        !isPlaceholder && hasCallToAction ? (
            <div style={{ margin: -spacing, marginTop: '10px' }} key="call-to-action">
                <CallToAction
                    callToAction={callToAction}
                    disabled={!scrolledBottom}
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
                <Scroll
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
                    verticalAlign="middle"
                >
                    <Layout
                        className={styles.layout}
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
                </Scroll>
            </Container>
        </div>
    );
};

Horoscope.propTypes = propTypes;
Horoscope.defaultProps = defaultProps;

export default React.memo(Horoscope);
