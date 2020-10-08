/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AudioElement from '@micromag/element-audio';
import TextElement from '@micromag/element-text';
import ImageElement from '@micromag/element-image';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import { VStack } from '@micromag/element-stack';

import {
    PropTypes as MicromagPropTypes,
    PlaceholderImage,
    PlaceholderAudio,
    PlaceholderText,
} from '@micromag/core';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

export const layouts = ['top', 'bottom', 'center', 'around'];

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    stack: PropTypes.shape({
        reverse: PropTypes.bool,
        spacing: MicromagPropTypes.spacing,
    }),
    maxWidth: PropTypes.number,
    audio: MicromagPropTypes.audioElement,
    text: MicromagPropTypes.textElement,
    image: MicromagPropTypes.imageElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: null,
    stack: null,
    maxWidth: 300,
    audio: {
        media: {
            src: null,
        },
        track: null,
        trackLng: null,
        controls: true,
        loop: false,
        autoPlay: false,
        muted: false,
    },
    image: null,
    text: null,
    background: null,
    current: true,
    active: false,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    className: null,
};

const AudioScreen = ({
    layout,
    stack,
    maxWidth,
    audio,
    image,
    text,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isPreview, isEditor } = getRenderFormat(renderFormat);
    const { spacing, reverse } = stack || {};

    const withImage = image !== null;
    const [ready, setReady] = useState(!withImage);
    const transitionPlaying = current && ready;

    let imageElement = null;

    const onImageLoaded = useCallback(() => {
        setReady(true);
    }, [setReady]);

    if (withImage) {
        if (isPlaceholder) {
            imageElement = <PlaceholderImage className={styles.placeholder} />;
        } else {
            imageElement = (
                <Transitions transitions={transitions} playing={transitionPlaying}>
                    <ImageElement
                        width={Math.min(width, maxWidth)}
                        height={Math.min(width, maxWidth)}
                        fit={{ size: 'cover' }}
                        contain
                        className={styles.image}
                        onLoaded={onImageLoaded}
                        {...image}
                    />
                </Transitions>
            );
        }
    }

    let audioElement = null;
    if (isPlaceholder) {
        audioElement = <PlaceholderAudio className={styles.placeholder} />;
    } else {
        audioElement = (
            <Transitions transitions={transitions} playing={transitionPlaying}>
                <AudioElement
                    className={styles.audio}
                    {...(isPlaceholder || isPreview ? { ...audio, src: null } : audio)}
                />
            </Transitions>
        );
    }

    let textElement = null;
    const withText = text !== null;
    if (withText) {
        if (isPlaceholder) {
            textElement = <PlaceholderText className={styles.placeholder} />;
        } else {
            textElement = (
                <Transitions transitions={transitions} playing={transitionPlaying}>
                    <TextElement {...text} className={styles.text} />
                </Transitions>
            );
        }
    }

    const stackClassNames = classNames([
        styles.stack,
        {
            [styles.full]: layout === 'around',
        },
    ]);

    return (
        <div className={classNames([
            styles.container,
            {
                [className]: className !== null,
                [styles.placeholder]: isPlaceholder,
                [styles[layout]]: layout !== null,
            },
        ])}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                maxRatio={maxRatio}
                playing={(isView && current) || (isEditor && active)}
            />
            <div className={styles.inner}>
                <Container width={width} height={height} maxRatio={maxRatio}>
                    <div className={styles.content}>
                        <VStack
                            className={stackClassNames}
                            spacing={layout === 'around' ? 'around' : spacing}
                            reverse={reverse}
                        >
                            {imageElement}
                            {audioElement}
                            {textElement}
                        </VStack>
                    </div>
                </Container>
            </div>
        </div>
    );
};

AudioScreen.propTypes = propTypes;
AudioScreen.defaultProps = defaultProps;

export default React.memo(AudioScreen);
