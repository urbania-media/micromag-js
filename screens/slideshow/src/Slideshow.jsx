/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { useScreenRenderContext, useScreenSize, useViewer } from '@micromag/core/contexts';
import { useResizeObserver } from '@micromag/core/hooks';
import { isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import Button from '@micromag/element-button';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Heading from '@micromag/element-heading';
import Layout from '@micromag/element-layout';
import { HStack, VStack } from '@micromag/element-stack';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['start', 'center', 'end']),
    title: MicromagPropTypes.headingElement,
    slides: PropTypes.oneOfType([MicromagPropTypes.imageMedias, MicromagPropTypes.imageElements]),
    // withCaptions: PropTypes.bool,
    spacing: PropTypes.number,
    captionMaxLines: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    // transitionStagger: PropTypes.number,
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'middle',
    // withCaptions: false,
    title: null,
    slides: [],
    spacing: 20,
    captionMaxLines: 2,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    // transitionStagger: 50,
    onPrevious: null,
    onNext: null,
    className: null,
};

const SlideshowScreen = ({
    layout,
    title,
    slides,
    // withCaptions,
    background,
    callToAction,
    current,
    active,
    spacing,
    captionMaxLines,
    transitions,
    // transitionStagger,
    onPrevious,
    onNext,
    className,
}) => {
    const { width, height, menuOverScreen } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;

    const finalSpacing = isPlaceholder ? 5 : spacing;

    const [imagesLoaded, setImagesLoaded] = useState(0);

    const ready = true;
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const hasTitle = title !== null;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const imagesEl = useRef([]);

    // Call to Action

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    const {
        ref: callToActionRef,
        entry: { contentRect: callToActionRect },
    } = useResizeObserver();

    const { height: callToActionHeight = 0 } = callToActionRect || {};

    const [currentSlide, setCurrentSlide] = useState(0);

    const onClickedPrevious = useCallback(
        (e) => {
            const previous = currentSlide === 0 ? currentSlide : currentSlide - 1;
            if ( previous === currentSlide && onPrevious !== null ) {
                onPrevious();
                console.log('should go to previous screen');
            }

            setCurrentSlide(previous);
        },
        [currentSlide, setCurrentSlide],
    );
    const onClickedNext = useCallback(
        (e) => {
            const next = currentSlide >= items.length - 1 ? currentSlide : currentSlide + 1;
            if ( next === currentSlide && onNext ) {
                onNext();
            }

            setCurrentSlide(next);
        },
        [currentSlide, setCurrentSlide],
    );

    const items = (slides || []).map((item, itemI) => {
        const { visual = null, caption = null } = item || {};
        const imageSize = { width: width - finalSpacing * 2, height: height / 2 };

        // const { caption = null } = finalImage || {};
        const hasImage = visual !== null;
        const hasCaption = isTextFilled(caption);

        return (
            <div
                key={`item-${itemI}`}
                className={styles.slide}
                style={{ transform: `translateX(${currentSlide * -100}%)` }}
            >
                <div
                    className={styles.slideContainer}
                    ref={(el) => {
                        imagesEl.current[itemI] = el;
                    }}
                >
                    <Transitions
                        transitions={transitions}
                        delay={1}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                    >
                        <VStack>
                            <ScreenElement
                                placeholder="image"
                                placeholderProps={{ className: styles.placeholder, height: '100%' }}
                                emptyLabel={
                                    <FormattedMessage
                                        defaultMessage="Image"
                                        description="Image placeholder"
                                    />
                                }
                                emptyClassName={styles.emptyImage}
                                isEmpty={!hasImage}
                            >
                                <Visual
                                    className={styles.image}
                                    media={visual}
                                    {...imageSize}
                                    objectFit={{ fit: 'contain' }}
                                    playing={backgroundPlaying}
                                    onLoaded={onImageLoaded}
                                />
                            </ScreenElement>

                            <ScreenElement
                                placeholder="line"
                                emptyLabel={
                                    <FormattedMessage
                                        defaultMessage="Caption"
                                        description="Caption placeholder"
                                    />
                                }
                                emptyClassName={styles.emptyCaption}
                                isEmpty={!hasCaption}
                            >
                                <div className={styles.caption}>
                                    <Text
                                        {...caption}
                                        className={styles.captionText}
                                        lineClamp={captionMaxLines}
                                    />
                                </div>
                            </ScreenElement>
                        </VStack>
                    </Transitions>
                </div>
            </div>
        );
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.isPlaceholder]: isPlaceholder,
                },
            ])}
            data-screen-ready={ready}
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
                <div
                    className={styles.content}
                    style={{
                        paddingTop: menuOverScreen && !isPreview ? menuSize : null,
                        paddingBottom: hasCallToAction ? callToActionHeight - finalSpacing : 0,
                    }}
                >
                    <Layout
                        className={styles.layout}
                        fullscreen
                        style={
                            !isPlaceholder
                                ? {
                                      padding: spacing,
                                  }
                                : null
                        }
                    >
                        <ScreenElement
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
                            {hasTitle ? (
                                <Heading
                                    className={classNames([styles.title])}
                                    {...title}
                                    size={1}
                                />
                            ) : null}
                        </ScreenElement>

                        <div className={styles.slider}>
                            <Button
                                className={styles.sliderPreviousBtn}
                                onClick={onClickedPrevious}
                            />
                            <Button className={styles.sliderNextBtn} onClick={onClickedNext} />
                            <HStack className={styles.sliderTrack} align={layout}>
                                {items}
                            </HStack>
                        </div>

                        {!isPlaceholder && hasCallToAction ? (
                            <div style={{ marginTop: -finalSpacing }}>
                                <CallToAction
                                    ref={callToActionRef}
                                    className={styles.callToAction}
                                    callToAction={callToAction}
                                    animationDisabled={isPreview}
                                    focusable={current && isView}
                                />
                            </div>
                        ) : null}
                    </Layout>
                </div>
            </Container>
        </div>
    );
};

SlideshowScreen.propTypes = propTypes;
SlideshowScreen.defaultProps = defaultProps;

export default React.memo(SlideshowScreen);
