/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isPlainObject from 'lodash/isPlainObject';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext, useViewer } from '@micromag/core/contexts';
import { ScreenElement, Transitions } from '@micromag/core/components';
import { isImageFilled, isTextFilled } from '@micromag/core/utils';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Grid from '@micromag/element-grid';
import Image from '@micromag/element-image';
import Text from '@micromag/element-text';

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
    images: PropTypes.oneOfType([MicromagPropTypes.imageMedias, MicromagPropTypes.imagesElements]),
    withCaptions: PropTypes.bool,
    spacing: PropTypes.number,
    captionMaxLines: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
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
    current: true,
    active: false,
    maxRatio: 3 / 4,
    transitions: null,
    transitionStagger: 50,
    className: null,
};

const GalleryScreen = ({
    layout,
    images,
    withCaptions,
    background,
    current,
    active,
    spacing,
    captionMaxLines,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { menuSize } = useViewer();
    const landscape = width > height;

    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

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
    const transitionDisabled = !isView && !isEdit;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const imagesEl = useRef([]);
    const [imagesSizes, setImagesSizes] = useState([]);

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
    }, [width, height, setImagesSizes, images, layout]);

    const items = [...Array(gridSpaces)].map((item, itemI) => {
        const image = images[itemI] || null;
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
                            <Image
                                className={styles.image}
                                {...finalImage}
                                {...imageSize}
                                objectFit={{ fit: 'cover' }}
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
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div
                    className={styles.content}
                    style={{
                        paddingTop: !landscape && !isPreview ? menuSize : null,
                    }}
                >
                    <Grid className={styles.grid} spacing={finalSpacing} items={items} {...grid} />
                </div>
            </Container>
        </div>
    );
};

GalleryScreen.propTypes = propTypes;
GalleryScreen.defaultProps = defaultProps;

export default React.memo(GalleryScreen);
