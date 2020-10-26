/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import { ScreenElement, TransitionsStagger } from '@micromag/core/components';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Layout from '@micromag/element-layout';
import Scroll from '@micromag/element-scroll';
import Image from '@micromag/element-image';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal', 'reverse']),
    images: MicromagPropTypes.imageElementsWithLegend,
    withLegends: PropTypes.bool,
    padding: PropTypes.number,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    maxImageRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'normal',
    images: [],
    withLegends: false,
    padding: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    maxImageRatio: 5 / 6,
    transitions: {
        in: {
            name: 'fade',
            duration: 250,
        },
        out: 'scale',
    },
    transitionStagger: 75,
    className: null,
};

const GalleryFeed = ({
    layout,
    images,
    withLegends,
    padding,
    background,
    current,
    active,
    maxRatio,
    maxImageRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const imagesCount = images.length;
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded >= imagesCount;
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const isReversed = layout === 'reverse';

    const screenRatio = width / height;
    const maxWidth = maxRatio !== null && screenRatio > maxRatio ? height * maxRatio : width;
    const imageWidth = maxWidth - padding * 2;
    const imageHeight = imageWidth / maxImageRatio;

    const items = [];

    (isPlaceholder ? [...Array(5)] : images ).forEach((imageEl, index) => {

        const { image = null, legend = null } = imageEl || {};
        const hasImage = image !== null;
        const hasLegend = legend !== null;

        items.push(
            <ScreenElement
                key={`image-${index}`}
                placeholder="image"
                emptyLabel={
                    <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEdit && !hasImage}
            >
                <Image
                    {...image}
                    width={imageWidth}
                    height={imageHeight}
                    shrinkHeight
                    objectFit={{ fit: 'contain' }}
                    onLoaded={onImageLoaded}
                />
            </ScreenElement>,
        );

        if (withLegends) {
            items.push(
                <ScreenElement
                    key={`legend-${index}`}
                    placeholder="shortText"
                    emptyLabel={
                        <FormattedMessage
                            defaultMessage="Legend"
                            description="Legend placeholder"
                        />
                    }
                    emptyClassName={styles.empty}
                    isEmpty={isEdit && !hasLegend}
                >
                    <Text {...legend} />
                </ScreenElement>,
            );
        }
    });

    if (isReversed) {
        items.reverse();
    }

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
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />

            <Container width={width} height={height} maxRatio={maxRatio} withScroll>
                <Scroll>
                    <Layout style={isView || isPreview ? { padding } : null}>
                        <TransitionsStagger
                            transitions={transitions}
                            stagger={transitionStagger}
                            disabled={!isView}
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

GalleryFeed.propTypes = propTypes;
GalleryFeed.defaultProps = defaultProps;

export default React.memo(GalleryFeed);
