/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isPlainObject from 'lodash/isPlainObject';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { isImageFilled, isTextFilled } from '@micromag/core/utils';
import { useResizeObserver } from '@micromag/core/hooks';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Grid from '@micromag/element-grid';
import Visual from '@micromag/element-visual';
import Text from '@micromag/element-text';
import CallToAction from '@micromag/element-call-to-action';

import layoutProps from './layouts';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf([
        // 2
        'two-vertical-equal',
        'two-vertical-top',
        'two-vertical-bottom',
        // 3
        'three-vertical',
        'one-two',
        'two-one',
        // 4
        'two-by-two',
        'four-vertical',
        'one-two-one',
        'four-mosaic',
        // 5
        'two-one-two',
        'one-two-two',
        'two-two-one',
        // 6
        'two-by-three',
        'one-one-two-two',
        'two-two-one-one',
    ]),
    images: PropTypes.oneOfType([MicromagPropTypes.imageMedias, MicromagPropTypes.imageElements]),
    withCaptions: PropTypes.bool,
    spacing: PropTypes.number,
    captionMaxLines: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    callToAction: MicromagPropTypes.callToAction,
    current: PropTypes.bool,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'four-mosaic',
    withCaptions: false,
    images: [],
    spacing: 20,
    captionMaxLines: 2,
    background: null,
    callToAction: null,
    current: true,
    transitions: null,
    transitionStagger: 50,
    className: null,
};

const GalleryScreen = ({
    layout,
    images,
    withCaptions,
    background,
    callToAction,
    current,
    spacing,
    captionMaxLines,
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
    const backgroundPlaying = current && (isView || isEdit);

    const finalSpacing = isPlaceholder ? 5 : spacing;

    const grid = isPlainObject(layoutProps[layout]) ? layoutProps[layout] : {};
    const { layout: gridLayout = [], vertical = false } = grid;

    const gridSpaces = gridLayout.reduce(
        (acc, { rows, columns }) => acc + (vertical ? rows : columns).length,
        0,
    );

    const [imagesLoaded, setImagesLoaded] = useState(0);
    const imagesCount = images !== null ? Math.min(gridSpaces, images.length) : 0;
    const ready = imagesLoaded >= imagesCount;
    const transitionPlaying = current && ready;
    const transitionDisabled = isStatic || isCapture || isPlaceholder || isPreview || isEdit;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const imagesEl = useRef([]);
    const [imagesSizes, setImagesSizes] = useState([]);

    const {
        ref: contentRef,
        entry: { contentRect },
    } = useResizeObserver();

    const { width: contentWidth = null, height: contentHeight = null } = contentRect || {};

    useEffect(() => {
        if (imagesEl.current.length) {
            setImagesSizes(
                imagesEl.current.map((imageEl) =>
                    imageEl !== null
                        ? {
                              width: imageEl.offsetWidth,
                              height: imageEl.offsetHeight,
                          }
                        : {},
                ),
            );
        }
    }, [contentWidth, contentHeight, layout, setImagesSizes]);

    // Call to Action

    const hasCallToAction = callToAction !== null && callToAction.active === true;
    const {
        ref: callToActionRef,
        entry: { contentRect: callToActionRect },
    } = useResizeObserver();

    const { height: callToActionHeight = 0 } = callToActionRect || {};

    const items = [...Array(gridSpaces)].map((item, itemI) => {
        const image = images !== null ? images[itemI] : null;
        const imageSize = imagesSizes[itemI] || {};

        const finalImage = withCaptions ? image : { media: image };

        const { caption = null } = finalImage || {};

        const hasImage = isImageFilled(finalImage);
        const hasCaption = isTextFilled(caption);

        return (
            <div key={`item-${itemI}`} className={styles.gridItem}>
                <div
                    className={styles.imageContainer}
                    ref={(el) => {
                        imagesEl.current[itemI] = el;
                    }}
                >
                    <Transitions
                        transitions={transitions}
                        delay={itemI * transitionStagger}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                        fullscreen
                    >
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
                                {...finalImage}
                                {...imageSize}
                                objectFit={{ fit: 'cover' }}
                                videoAutoplay={backgroundPlaying}
                                onLoaded={onImageLoaded}
                            />
                        </ScreenElement>
                    </Transitions>
                </div>
                {withCaptions ? (
                    <Transitions
                        transitions={transitions}
                        delay={itemI * transitionStagger}
                        playing={transitionPlaying}
                        disabled={transitionDisabled}
                    >
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
                    </Transitions>
                ) : null}
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
                    {...background}
                    width={width}
                    height={height}
                    playing={backgroundPlaying}
                />
            ) : null}
            <Container width={width} height={height}>
                <div
                    className={styles.content}
                    style={{
                        paddingTop: menuOverScreen && !isPreview ? menuSize : null,
                        paddingBottom: hasCallToAction ? callToActionHeight - finalSpacing : 0,
                    }}
                    ref={contentRef}
                >
                    <Grid className={styles.grid} spacing={finalSpacing} items={items} {...grid} />
                    {!isPlaceholder && hasCallToAction ? (
                        <div style={{ marginTop: -finalSpacing }}>
                            <CallToAction
                                ref={callToActionRef}
                                className={styles.callToAction}
                                callToAction={callToAction}
                                animationDisabled={isPreview}
                            />
                        </div>
                    ) : null}
                </div>
            </Container>
        </div>
    );
};

GalleryScreen.propTypes = propTypes;
GalleryScreen.defaultProps = defaultProps;

export default React.memo(GalleryScreen);
