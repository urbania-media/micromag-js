/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
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
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
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
    visible: true,
    active: false,
    renderFormat: 'view',
};

const AudioScreen = ({
    layout,
    stack,
    maxWidth,
    audio,
    image,
    text,
    background,
    visible,
    active,
    renderFormat,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isPreview, isEditor } = getRenderFormat(renderFormat);
    const { spacing, reverse } = stack || {};
    let imageElement = null;

    if (isPlaceholder && image !== null) {
        imageElement = <PlaceholderImage className={styles.placeholder} />;
    } else {
        imageElement = (
            <ImageElement
                width={image !== null ? Math.min(width, maxWidth) : null}
                height={image !== null ? Math.min(width, maxWidth) : null}
                fit={{ size: 'cover' }}
                contain
                className={styles.image}
                {...image}
            />
        );
    }

    let audioElement = null;
    if (isPlaceholder) {
        audioElement = <PlaceholderAudio className={styles.placeholder} />;
    } else {
        audioElement = (
            <AudioElement
                className={styles.audio}
                {...(isPlaceholder || isPreview ? { ...audio, src: null } : audio)}
            />
        );
    }

    let textElement = null;
    if (isPlaceholder && text !== null) {
        textElement = <PlaceholderText className={styles.placeholder} />;
    } else {
        textElement = <TextElement {...text} className={styles.text} />;
    }

    const containerClassNames = classNames([
        styles.container,
        {
            [styles.placeholder]: isPlaceholder,
            [styles[layout]]: layout !== null,
        },
    ]);

    const stackClassNames = classNames([
        styles.stack,
        {
            [styles.full]: layout === 'around',
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.inner}>
                <Container width={width} height={height} visible={visible}>
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
