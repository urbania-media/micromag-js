/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import AudioComponent from '@micromag/component-audio';
import TextComponent from '@micromag/component-text';
import ImageComponent from '@micromag/component-image';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import Box from '@micromag/component-box';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    audio: MicromagPropTypes.audioComponent,
    text: MicromagPropTypes.textComponent,
    image: MicromagPropTypes.imageComponent,
    box: MicromagPropTypes.boxComponent,
    background: MicromagPropTypes.backgroundComponent,
    maxWidth: PropTypes.number,
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
    box: null,
    background: null,
    maxWidth: 300,
    renderFormat: 'view',
    className: null,
};

const AudioScreen = ({
    audio,
    image,
    text,
    box,
    background,
    maxWidth,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isSimple } = getRenderFormat(renderFormat);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    <Box {...box} withSmallSpacing={isSimple} className={styles.box}>
                        {isPlaceholder && image !== null ? (
                            <Placeholders.MediumImage className={styles.placeholder} />
                        ) : (
                            <ImageComponent
                                {...image}
                                maxWidth={Math.min(width, maxWidth)}
                                maxHeight={Math.min(width, maxWidth)}
                                fit={{ size: 'cover' }}
                                className={styles.image}
                            />
                        )}
                        {isPlaceholder ? (
                            <Placeholders.Audio className={styles.placeholder} />
                        ) : (
                            <AudioComponent
                                className={styles.audio}
                                {...(isSimple ? { ...audio, src: null } : audio)}
                            />
                        )}
                        {isPlaceholder && text !== null ? (
                            <Placeholders.Text className={styles.placeholder} />
                        ) : (
                            <TextComponent {...text} className={styles.text} />
                        )}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

AudioScreen.propTypes = propTypes;
AudioScreen.defaultProps = defaultProps;

export default AudioScreen;
