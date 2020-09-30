/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import AudioElement from '@micromag/element-audio';
import TextElement from '@micromag/element-text';
import ImageElement from '@micromag/element-image';
import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import { VStack } from '@micromag/element-stack';

import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

export const layouts = ['top', 'bottom', 'center'];

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    audio: MicromagPropTypes.audioElement,
    text: MicromagPropTypes.textElement,
    image: MicromagPropTypes.imageElement,
    background: MicromagPropTypes.backgroundElement,
    maxWidth: PropTypes.number,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
};

const defaultProps = {
    layout: null,
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
    maxWidth: 300,
    visible: true,
    active: false,
    renderFormat: 'view',
};

const AudioScreen = ({
    layout,
    audio,
    image,
    text,
    background,
    visible,
    active,
    maxWidth,
    renderFormat,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isPreview, isEditor } = getRenderFormat(renderFormat);

    let imageElement = null;

    console.log(image);

    if (isPlaceholder && image !== null) {
        imageElement = <Placeholders.MediumImage className={styles.placeholder} />;
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
        audioElement = <Placeholders.Audio className={styles.placeholder} />;
    } else {
        audioElement = (
            <AudioElement
                className={styles.audio}
                {...(isPlaceholder || isPreview ? { ...audio, src: null } : audio)}
            />
        );
    }

    let textElement = null;
    if (isPlaceholder) {
        textElement = <Placeholders.Text className={styles.placeholder} />;
    } else {
        textElement = <TextElement {...text} className={styles.text} />;
    }

    const containerClassNames = classNames([
        styles.container,
        {
            [styles[layout]]: layout !== null,
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
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible}>
                    <VStack align="start">
                        {imageElement}
                        {audioElement}
                        {textElement}
                    </VStack>
                </Container>
            </div>
        </div>
    );
};

AudioScreen.propTypes = propTypes;
AudioScreen.defaultProps = defaultProps;

export default React.memo(AudioScreen);
