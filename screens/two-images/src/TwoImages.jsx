/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { PlaceholderImage, PlaceholderText, Empty, Transitions } from '@micromag/core/components';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Image from '@micromag/element-image';
import Text from '@micromag/element-text';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['top', 'center', 'bottom', 'split']),
    image: MicromagPropTypes.imageMedia,
    image2: MicromagPropTypes.imageMedia,
    text: MicromagPropTypes.textElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    transitionStagger: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'top',
    image: null,
    image2: null,
    text: null,
    background: null,
    current: true,
    active: true,
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    transitionStagger: 100,
    className: null,
};

const TwoImages = ({
    layout,
    image,
    image2,
    text,
    background,
    current,
    active,
    maxRatio,
    transitions,
    transitionStagger,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isView, isPlaceholder, isPreview, isEdit } = useScreenRenderContext();

    const withText = text !== null;
    const withImage = image !== null;
    const withImage2 = image2 !== null;
    const isEmpty = isEdit && !withText && !withImage;

    const imagesCount = [withImage, withImage2].reduce(
        (acc, current) => acc + (current ? 1 : 0),
        0,
    );
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const ready = imagesLoaded >= imagesCount;
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setImagesLoaded(imagesLoaded + 1);
    }, [imagesLoaded, setImagesLoaded]);

    let imageElement = null;
    let image2Element = null;
    let textElement = null;

    if (isPlaceholder) {
        imageElement = <PlaceholderImage />;
        image2Element = <PlaceholderImage />;
        textElement = <PlaceholderText />;
    } else if (isEmpty) {
        imageElement = (
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage defaultMessage="Image" description="Image placeholder" />
            </Empty>
        );
        image2Element = (
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage
                    defaultMessage="Second image"
                    description="Second image placeholder"
                />
            </Empty>
        );
        textElement = (
            <Empty className={styles.empty}>
                <FormattedMessage defaultMessage="Title" description="Title placeholder" />
            </Empty>
        );
    } else {
        let transitionDelay = 0;

        const createElement = (children) => {
            const element = (
                <Transitions
                    transitions={transitions}
                    delay={transitionDelay}
                    playing={transitionPlaying}
                >
                    {children}
                </Transitions>
            );
            transitionDelay += transitionStagger;
            return element;
        };

        if (withImage) {
            imageElement = createElement(
                <Image
                    {...image}
                    fit={{ size: 'cover', maxRatio: 9 / 16 }}
                    onLoaded={onImageLoaded}
                />,
            );
        }

        if (withImage2) {
            image2Element = createElement(
                <Image
                    {...image2}
                    fit={{ size: 'cover', maxRatio: 9 / 16 }}
                    onLoaded={onImageLoaded}
                />,
            );
        }

        if (withText) {
            textElement = createElement(<Text {...text} />);
        }
    }

    // Add elements to items

    const items = [];
    if (imageElement !== null) {
        items.push(imageElement);
    }

    if (textElement !== null) {
        items.push(textElement);
    }

    if (image2Element !== null) {
        items.push(image2Element);
    }

    // convert layout to Container props
    const layoutChunks = layout.split('-');
    const isDistribution = layoutChunks[0] === 'split';
    const verticalAlign = isDistribution ? layoutChunks[1] : layoutChunks[0];
    const distribution = isDistribution ? 'between' : null;

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
            <Container
                width={width}
                height={height}
                maxRatio={maxRatio}
                verticalAlign={verticalAlign}
                distribution={distribution}
            >
                {items}
            </Container>
        </div>
    );
};

TwoImages.propTypes = propTypes;
TwoImages.defaultProps = defaultProps;

export default React.memo(TwoImages);
