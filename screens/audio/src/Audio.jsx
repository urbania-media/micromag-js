/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useScreenSize, useScreenRenderContext } from '@micromag/core/contexts';
import {
    PlaceholderImage,
    PlaceholderAudio,
    PlaceholderText,
    Transitions,
} from '@micromag/core/components';
import AudioElement from '@micromag/element-audio';
import TextElement from '@micromag/element-text';
import ImageElement from '@micromag/element-image';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';

import styles from './styles.module.scss';

const propTypes = {
    layout: PropTypes.oneOf(['normal']),
    maxWidth: PropTypes.number,
    audio: MicromagPropTypes.audioElement,
    text: MicromagPropTypes.textElement,
    image: MicromagPropTypes.imageElement,
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: null,
    maxWidth: 300,
    audio: {
        media: {
            src: null,
        },
        loop: false,
        autoPlay: false,
        muted: false,
    },
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
    className: null,
};

const Audio = ({
    layout,
    maxWidth,
    audio,
    image,
    text,
    background,
    current,
    active,
    maxRatio,
    transitions,
    className,
}) => {
    const apiRef = useRef();
    
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isPreview, isEdit } = useScreenRenderContext();

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
                        objectFit={{ fit: 'cover' }}
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
                    media={(isPlaceholder ? { ...audio, src: null } : audio)}
                    ref={apiRef}
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

    useEffect( () => {
        console.log(audio, apiRef.current)
    }, [audio]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.placeholder]: isPlaceholder,
                    [styles[layout]]: layout !== null,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                maxRatio={maxRatio}
                playing={(isView && current) || (isEdit && active)}
            />
            <Container width={width} height={height} maxRatio={maxRatio}>
                <div className={styles.content}>
                    <div className={styles.inner}>
                        {imageElement}
                        {audioElement}
                        {textElement}
                    </div>
                </div>
            </Container>
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default React.memo(Audio);
