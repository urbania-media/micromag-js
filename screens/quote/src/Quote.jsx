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
import Layout, { Spacer } from '@micromag/element-layout';
import Quote from '@micromag/element-quote';
import Text from '@micromag/element-text';
import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'middle', 'bottom', 'split']),
    quote: MicromagPropTypes.textElement,
    author: MicromagPropTypes.textElement,
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
    layout: 'top',
    quote: null,
    author: null,
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

const QuoteScreen = ({
    layout,
    quote,
    author,
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
    const { width, height, resolution } = useScreenSize();
    const { topHeight: viewerTopHeight } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();

    const hasQuote = isTextFilled(quote);
    const hasAuthor = isTextFilled(author);

    const isSplitted = layout === 'split';
    const isTopLayout = layout === 'top';
    const isMiddleLayout = layout === 'middle';
    const verticalAlign = isSplitted ? null : layout;

    const quoteWithMargin = hasQuote && hasAuthor && !isSplitted;
    const transitionPlaying = current;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const backgroundPlaying = current && (isView || isEdit);
    const mediaShouldLoad = current || active;

    const hasCallToAction = callToAction !== null && callToAction.active === true;

    const items = [
        !isPlaceholder && hasCallToAction && isMiddleLayout ? (
            <Spacer key="spacer-cta-top" />
        ) : null,
        <ScreenElement
            key="quote"
            placeholder="quote"
            emptyLabel={<FormattedMessage defaultMessage="Quote" description="Quote placeholder" />}
            emptyClassName={styles.emptyQuote}
            isEmpty={!hasQuote}
        >
            {hasQuote ? (
                <Quote
                    className={classNames([styles.quote, { [styles.withMargin]: quoteWithMargin }])}
                    {...quote}
                />
            ) : null}
        </ScreenElement>,
        isSplitted && <Spacer key="spacer" />,
        <ScreenElement
            key="author"
            placeholder="subtitle"
            emptyLabel={
                <FormattedMessage defaultMessage="Author" description="Author placeholder" />
            }
            emptyClassName={styles.emptyAuthor}
            isEmpty={!hasAuthor}
        >
            {hasAuthor ? <Text className={styles.author} {...author} /> : null}
        </ScreenElement>,
        !isPlaceholder && hasCallToAction && (isTopLayout || isMiddleLayout) ? (
            <Spacer key="spacer-cta-bottom" />
        ) : null,
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
                    [className]: className,
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
                    shouldLoad={mediaShouldLoad}
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

QuoteScreen.propTypes = propTypes;
QuoteScreen.defaultProps = defaultProps;

export default React.memo(QuoteScreen);
