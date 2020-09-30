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

const propTypes = {
    audio: MicromagPropTypes.audioElement,
    text: MicromagPropTypes.textElement,
    image: MicromagPropTypes.imageElement,
    background: MicromagPropTypes.backgroundElement,
    maxWidth: PropTypes.number,
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    audio: {
        src: null,
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
    className: null,
};

const AudioScreen = ({
    audio,
    image,
    text,
    background,
    visible,
    active,
    maxWidth,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isPreview, isEditor } = getRenderFormat(renderFormat);

    const imageElement = useMemo(() => {
        if (isPlaceholder && image !== null) {
            return <Placeholders.MediumImage className={styles.placeholder} />;
        }

        return (
            <ImageElement
                {...image}
                maxWidth={image !== null ? Math.min(width, maxWidth) : null}
                maxHeight={image !== null ? Math.min(width, maxWidth) : null}
                fit={{ size: 'cover' }}
                contain
                className={styles.image}
            />
        );
    });

    const audioElement = useMemo(() => {
        if (isPlaceholder) {
            return <Placeholders.Audio className={styles.placeholder} />;
        }

        return (
            <AudioElement
                className={styles.audio}
                {...(isPlaceholder || isPreview ? { ...audio, src: null } : audio)}
            />
        );
    });

    const textElement = useMemo(() => {
        if (isPlaceholder) {
            return <Placeholders.Text className={styles.placeholder} />;
        }

        return <TextElement {...text} className={styles.text} />;
    });

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
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
