/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { useResizeObserver, useTrackScreenEvent } from '@micromag/core/hooks';
import { isImageFilled, isTextFilled } from '@micromag/core/utils';
import Background from '@micromag/element-background';
import CallToAction from '@micromag/element-call-to-action';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Text from '@micromag/element-text';
import Visual from '@micromag/element-visual';
import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal', 'reverse']),
    images: PropTypes.oneOfType([
        MicromagPropTypes.imageElementsWithCaption,
        MicromagPropTypes.imageMedias,
    ]),
    withCaptions: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    active: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    type: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    images: null,
    withCaptions: false,
    spacing: 20,
    background: null,
    callToAction: null,
    current: true,
    active: true,
    transitions: null,
    transitionStagger: 75,
    type: null,
    className: null,
};

const GalleryFeedScreen = ({
    layout,
    images,
    withCaptions,
    spacing,
    background,
    callToAction,
    current,
    active,
    transitions,
    transitionStagger,
    type,
    className,
}) => {
    const trackScreenEvent = useTrackScreenEvent(type);
    const { width, height, menuOverScreen, resolution } = useScreenSize();
    const { menuSize } = useViewer();

    const { isView, isPreview, isPlaceholder, isEdit, isStatic, isCapture } =
        useScreenRenderContext();
    const backgroundPlaying = current && (isView || isEdit);
    const backgroundShouldLoad = current || active || !isView;
    const hasImages = images !== null;
    const imagesCount = hasImages ? images.length : 0;
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded >= imagesCount;
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;
    const scrollingDisabled = (!isEdit && transitionDisabled) || !current;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const isReversed = layout === 'reverse';

    const items = [];

    const editImages = isEdit && imagesCount === 0 ? [null] : images;
    const finalImages = isPlaceholder ? [...Array(5)] : editImages;

    const {
        ref: firstImageRef,
        entry: { contentRect },
    } = useResizeObserver();
    const { width: firstImageRefWidth } = contentRect || {};

    (finalImages || []).forEach((image, index) => {
        const finalImage = withCaptions ? image : { media: image };
        const { caption = null } = finalImage || {};
        const hasImage = isImageFilled(finalImage);
        const hasCaption = isTextFilled(caption);

        const imageElement = (
            <ScreenElement
                key={`image-${index}`}
                placeholder="image"
                emptyLabel={
                    <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                }
                emptyClassName={styles.emptyImage}
                isEmpty={!hasImage}
            >
                <div className={styles.imageContainer} ref={index === 0 ? firstImageRef : null}>
                    <Visual
                        {...finalImage}
                        width={firstImageRefWidth}
                        resolution={resolution}
                        onLoaded={onImageLoaded}
                        playing={backgroundPlaying}
                    />
                </div>
            </ScreenElement>
        );

        let captionElement = null;

        if (withCaptions) {
            const marginTop = !isReversed || index > 0 ? spacing / 2 : 0;
            const marginBottom =
                isReversed || index < (finalImages || []).length - 1 ? spacing / 2 : 0;
            captionElement = (
                <ScreenElement
                    key={`caption-${index}`}
                    placeholder="text"
                    placeholderProps={{ lines: 2 }}
                    emptyLabel={
                        <FormattedMessage
                            defaultMessage="Caption"
                            description="Caption placeholder"
                        />
                    }
                    emptyClassName={styles.emptyCaption}
                    isEmpty={!hasCaption}
                >
                    <div
                        className={styles.caption}
                        style={{
                            marginTop,
                            marginBottom,
                        }}
                    >
                        <Text {...caption} className={styles.captionText} />
                    </div>
                </ScreenElement>
            );
        }

        if (isReversed) {
            if (withCaptions) {
                items.push(captionElement);
            }
            items.push(imageElement);
        } else {
            items.push(imageElement);
            if (withCaptions) {
                items.push(captionElement);
            }
        }

        if (!isPlaceholder && index < (finalImages || []).length - 1) {
            items.push(<div key={`spacing-${index}`} style={{ height: spacing }} />);
        }
    });

    // Call to Action

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    const [scrolledBottom, setScrolledBottom] = useState(false);
    const {
        ref: callToActionRef,
        entry: { contentRect: callToActionRect },
    } = useResizeObserver();

    const { height: callToActionHeight = 0 } = callToActionRect || {};

    if (!isPlaceholder && hasCallToAction) {
        items.push(<div key="cta-spacer" style={{ height: callToActionHeight }} />);
    }

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
                    resolution={resolution}
                    playing={backgroundPlaying}
                    shouldLoad={backgroundShouldLoad}
                />
            ) : null}
            <Container width={width} height={height}>
                <Scroll
                    disabled={scrollingDisabled}
                    onScrolledBottom={onScrolledBottom}
                    onScrolledNotBottom={onScrolledNotBottom}
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
                {!isPlaceholder && hasCallToAction ? (
                    <CallToAction
                        ref={callToActionRef}
                        className={styles.callToAction}
                        disabled={!scrolledBottom}
                        animationDisabled={isPreview}
                        callToAction={callToAction}
                        focusable={current && isView}
                        screenSize={{ width, height }}
                    />
                ) : null}
            </Container>
        </div>
    );
};

GalleryFeedScreen.propTypes = propTypes;
GalleryFeedScreen.defaultProps = defaultProps;

export default React.memo(GalleryFeedScreen);
