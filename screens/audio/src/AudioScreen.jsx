/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import AudioComponent from '@micromag/element-audio';
import TextComponent from '@micromag/element-text';
import ImageComponent from '@micromag/element-image';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Box from '@micromag/element-box';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    audio: MicromagPropTypes.audioElement,
    text: MicromagPropTypes.textElement,
    image: MicromagPropTypes.imageElement,
    box: MicromagPropTypes.boxElement,
    background: MicromagPropTypes.backgroundElement,
    maxWidth: PropTypes.number,
    visible: PropTypes.bool,
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
    visible: true,
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
    visible,
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
                <Frame width={width} height={height} visible={visible}>
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

export default React.memo(AudioScreen);
