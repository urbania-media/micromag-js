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
    layout: PropTypes.oneOf([
        'top',
        'top-reverse',
        'center',
        'center-reverse',
        'bottom',
        'bottom-reverse',
        'split-reverse',
        'split',
    ]),
    image: MicromagPropTypes.imageMedia,
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

const TextImage = ({
    layout,
    image,
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
    const isEmpty = isEdit && !withText && !withImage;

    const [ready, setReady] = useState(!withImage);
    const transitionPlaying = current && ready;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    let imageElement = null;
    let textElement = null;

    if (isPlaceholder) {
        imageElement = <PlaceholderImage />;
        textElement = <PlaceholderText />;
    } else if (isEmpty) {
        imageElement = (
            <Empty className={classNames([styles.empty, styles.emptyImage])}>
                <FormattedMessage defaultMessage="Image" description="Image placeholder" />
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

    // convert layout to Container props

    const layoutChunks = layout.split('-');
    const isDistribution = layoutChunks[0] === 'split';
    const verticalAlign = isDistribution ? layoutChunks[1] : layoutChunks[0];
    const distribution = isDistribution ? 'between' : null;

    if (layoutChunks.length === 2 && layoutChunks[1] === 'reverse') {
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

TextImage.propTypes = propTypes;
TextImage.defaultProps = defaultProps;

export default React.memo(TextImage);
