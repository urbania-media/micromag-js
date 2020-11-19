/* eslint-disable react/no-array-index-key, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes, useResizeObserver } from '@micromag/core';
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
    layout: 'normal',
    images: [],
    withLegends: false,
    spacing: 20,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: { in: 'fade', out: 'fade' },
    transitionStagger: 75,
    className: null,
};

const GalleryFeedScreen = ({
    layout,
    images,
    withLegends,
    spacing,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const landscape = width > height;
    const { isView, isPreview, isPlaceholder, isEdit } = useScreenRenderContext();

    const imagesCount = images.length;
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded >= imagesCount;
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    const isReversed = layout === 'reverse';

    const items = [];

    const editImages = isEdit && images.length === 0 ? [{}] : images;
    const finalImages = isPlaceholder ? [...Array(5)] : editImages;

    const {
        ref: firstImageRef,
        entry: { contentRect },
    } = useResizeObserver();
    const { width: firstImageRefWidth } = contentRect || {};

    finalImages.forEach((imageEl, index) => {
        const { image = null, legend = null } = imageEl || {};
        const hasImage = image !== null;
        const hasLegend = legend !== null;

        const imageElement = (
            <ScreenElement
                key={`image-${index}`}
                placeholder="image"
                emptyLabel={
                    <FormattedMessage defaultMessage="Image" description="Image placeholder" />
                }
                emptyClassName={styles.empty}
                isEmpty={isEdit && !hasImage}
            >
                <div className={styles.imageContainer} ref={index === 0 ? firstImageRef : null}>
                    <Image {...image} width={firstImageRefWidth} onLoaded={onImageLoaded} />
                </div>
            </ScreenElement>
        );

        let legendElement = null;

        if (withLegends) {
            const marginTop = !isReversed || index > 0 ? spacing / 2 : 0;
            const marginBottom = isReversed || index < finalImages.length - 1 ? spacing / 2 : 0;
            legendElement = (
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
                    <div
                        className={styles.legend}
                        style={{
                            marginTop,
                            marginBottom,
                        }}
                    >
                        <Text {...legend} />
                    </div>
                </ScreenElement>
            );
        }

        if (isReversed) {
            if (withLegends) {
                items.push(legendElement);
            }
            items.push(imageElement);
        } else {
            items.push(imageElement);
            if (withLegends) {
                items.push(legendElement);
            }
        }

        if (!isPlaceholder && index < finalImages.length - 1) {
            items.push(<div key={`spacing-${index}`} style={{ height: spacing }} />);
        }
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
                playing={(isView && current) || (isEdit && active)}
                maxRatio={maxRatio}
            />

            <Container width={width} height={height} maxRatio={maxRatio} withScroll>
                <Scroll disabled={isPlaceholder} hideArrow={isPreview}>
                    <Layout
                        style={
                            isView || isPreview
                                ? {
                                      padding: spacing,
                                      paddingTop: isView && !landscape ? spacing * 2 : spacing,
                                  }
                                : null
                        }
                    >
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

GalleryFeedScreen.propTypes = propTypes;
GalleryFeedScreen.defaultProps = defaultProps;

export default React.memo(GalleryFeedScreen);
