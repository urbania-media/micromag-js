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

import styles from './styles.module.scss';

const propTypes = {
    audio: MicromagPropTypes.audioComponent,
    text: MicromagPropTypes.textComponent,
    image: MicromagPropTypes.imageComponent,
    box: MicromagPropTypes.boxComponent,
    background: MicromagPropTypes.backgroundComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    audio: {
        src: null,
        track: null,
        trackLng: null,
        controls: true,
    },
    image: null,
    text: null,
    box: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

const Audio = ({ audio, image, text, box, background, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    <Box {...box} className={styles.box}>
                        {isSimple && image !== null ? (
                            <Placeholders.Image className={styles.placeholder} />
                        ) : (
                            <ImageComponent
                                {...image}
                                maxWidth={Math.min(width, 300)}
                                maxHeight={Math.min(width, 300)}
                                fit={{ size: 'cover' }}
                                className={styles.image}
                            />
                        )}
                        {isSimple ? (
                            <Placeholders.Audio className={styles.placeholder} />
                        ) : (
                            <AudioComponent className={styles.audio} {...audio} />
                        )}
                        {isSimple && text !== null ? (
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

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default Audio;
