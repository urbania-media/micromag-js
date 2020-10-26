/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isPlainObject from 'lodash/isPlainObject';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, PlaceholderImage, PlaceholderShortText, Transitions } from '@micromag/core/components';
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
        'two-vertical',
        'two-horizontal',
        // 3
        'one-plus-two',
        'two-plus-one',
        'three-vertical',
        // 4
        'four-mosaic',
        'four-mosaic-reverse',
        'two-by-two',
        'one-plus-three',
        // 5
        'two-wide-plus-three',
        'three-plus-two-wide',
        // 6
        'two-by-three',
        'three-by-two',
    ]),
    images: MicromagPropTypes.imageMedias,
    withLegends: PropTypes.bool,
    spacing: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: null,
    withLegends: false,
    images: [],
    spacing: 10,
    background: null,
    current: true,
    active: false,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 250,
        },
        out: 'scale',
    },
    transitionStagger: 50,
    className: null,
};

const Gallery = ({
    layout,
    images,
    withLegends,
    background,
    current,
    active,
    spacing,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const finalSpacing = isPlaceholder || isPreview ? 4 : spacing;

    const grid = isPlainObject(layoutProps[layout]) ? layoutProps[layout] : {};
    const { layout: gridLayout = [], vertical = false } = grid;

    const gridSpaces = gridLayout.reduce((acc, { rows, columns }) => acc + (vertical ? rows:columns).length, 0);

    const [imagesLoaded, setImagesLoaded] = useState(0);
    const imagesCount = images !== null ? Math.min(gridSpaces, images.length) : 0;
    const ready = imagesLoaded >= imagesCount;
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const imagesEl = useRef([]);
    const [imagesSizes, setImagesSizes] = useState([]);

    useEffect( () => {
        if (imagesEl.current.length) {
            setImagesSizes(imagesEl.current.map(imageEl => {
                const imageRect = imageEl.getBoundingClientRect();
                return { width: imageRect.width, height: imageRect.height };
            }));
        }
    }, [width, height, setImagesSizes]);

    const items = [...Array(gridSpaces)].map((item, itemI) => {
        const image = images[itemI] || null;
        const imageSize = imagesSizes[itemI] || {};
        const { legend = null } = image || {};

        const hasImage = image !== null;
        const hasLegend = legend !== null;
        
        const isEmptyImage = isEdit && !hasImage;
        const isEmptyLegend = isEdit && !hasLegend;

        return (
            <div key={`item-${itemI}`} className={styles.gridItem}>
                <div className={styles.image} ref={ el => {imagesEl.current[itemI] = el }}>
                    <Transitions
                        transitions={transitions}
                        delay={itemI * transitionStagger}
                        playing={transitionPlaying}
                        disabled={isPlaceholder || isEmptyImage}
                    >
                        <ScreenElement
                            placeholder={<PlaceholderImage className={styles.placeholder} width="100%" height="100%" />}
                            emptyLabel={
                                <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                            }
                            emptyClassName={styles.empty}
                            isEmpty={isEmptyImage}
                        >
                            <Image
                                {...image}
                                {...imageSize}
                                objectFit={{ fit: 'cover' }}
                                onLoaded={onImageLoaded}
                            />
                        </ScreenElement>
                    </Transitions>
                </div>
                { withLegends ? <div className={styles.legend}>
                    <Transitions
                        transitions={transitions}
                        delay={itemI * transitionStagger}
                        playing={transitionPlaying}
                        disabled={isPlaceholder || isEmptyLegend}
                    >
                        <ScreenElement
                            placeholder={<PlaceholderShortText className={styles.placeholder} width="100%" />}
                            emptyLabel={
                                <FormattedMessage defaultMessage="Legend" description="Legend placeholder" />
                            }
                            emptyClassName={styles.empty}
                            isEmpty={isEmptyLegend}
                        >
                            <Text {...legend} className={styles.legendText} />
                        </ScreenElement>
                    </Transitions>
                </div> : null }
            </div>
        );        
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
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
                <Grid className={styles.grid} spacing={finalSpacing} items={items} {...grid} />
            </Container>
        </div>
    );
};

Gallery.propTypes = propTypes;
Gallery.defaultProps = defaultProps;

export default React.memo(Gallery);
