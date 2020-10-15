/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Image from '@micromag/element-image';
import { VStack, HStack } from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, PlaceholderImage, Empty } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['single', 'double', 'triple', 'mixed-double', 'mixed-triple']),
    background: MicromagPropTypes.backgroundElement,
    images: MicromagPropTypes.imageMedias,
    spacing: PropTypes.number,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'single',
    background: null,
    images: [],
    spacing: 10,
    current: true,
    active: true,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    transitionStagger: 75,
    className: null,
};

const GalleryFeed = ({
    layout,
    images: imageList,
    spacing,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEditor } = getRenderFormat(renderFormat);

    const defaultArray = [
        ...Array(16).map((i) => ({
            id: `image-${i}`,
            ...(imageList[i] ? imageList[i] : null),
        })),
    ];
    const images =
        imageList && imageList.length > 0 && !isPlaceholder
            ? imageList
            : [...Array(16)].map(() => null);
    const currentImages = isEditor && imageList.length === 0 ? defaultArray : images;

    const imagesCount = currentImages.length;
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded >= imagesCount;
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const groups = [];
    let step = 0;
    let row = 0;
    let index = 0;

    let columns;

    switch (layout) {
        default:
        case 'single':
            columns = [1];
            break;
        case 'double':
            columns = [2];
            break;
        case 'triple':
            columns = [3];
            break;
        case 'mixed-double':
            columns = [1, 2];
            break;
        case 'mixed-triple':
            columns = [1, 3];
            break;
    }

    currentImages.forEach((image) => {
        const max = columns[step];
        if (row < max) {
            row += 1;
        } else {
            index += 1;
            row = 1;
            if (step < columns.length - 1) {
                step += 1;
            } else {
                step = 0;
            }
        }
        if (!groups[index]) {
            groups[index] = [];
        }
        groups[index].push(image);
    });

    let transitionDelay = 0;

    const items = groups.map((its, i) => {
        const stackKey = `gallery-group-${i + 1}`;
        const stackItems = its.map((it, j) => {
            const isEmpty = it !== null && it.image !== null;

            let imageElement = null;

            if (isView || (isEditor && !isEmpty)) {
                imageElement = (
                    <Transitions transitions={transitions} delay={transitionDelay} playing={transitionPlaying}>
                        <Image
                            {...it}
                            fit={{ size: 'cover' }}
                            contain
                            className={styles.imageComponent}
                            onLoaded={onImageLoaded}
                        />
                    </Transitions>
                );
                transitionDelay += transitionStagger;
            } else if (isPreview) {
                imageElement = <div className={styles.previewBlock} />;
            } else if (isPlaceholder) {
                imageElement = (
                    <PlaceholderImage
                        key={`image-${j + 1}`}
                        className={styles.placeholder}
                        width="100%"
                        height="100%"
                    />
                );
            } else if (isEditor && isEmpty) {
                imageElement = (
                    <Empty className={styles.empty}>
                        <FormattedMessage defaultMessage="Gallery feed" />
                    </Empty>
                );
            }

            return (
                <div
                    key={`image-${j + 1}`}
                    className={classNames([
                        styles.image,
                        {
                            [styles[`columns${its.length}`]]: columns !== null,
                        },
                    ])}
                    style={{ padding: isPlaceholder ? 2 : spacing / 2 }}
                >
                    {imageElement}
                </div>
            );
        });

        return <HStack key={stackKey}>{stackItems}</HStack>;
    });

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.placeholder]: isPlaceholder,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />

            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content}>
                    <VStack>{items}</VStack>
                </div>
            </Container>
        </div>
    );
};

GalleryFeed.propTypes = propTypes;
GalleryFeed.defaultProps = defaultProps;

export default React.memo(GalleryFeed);
