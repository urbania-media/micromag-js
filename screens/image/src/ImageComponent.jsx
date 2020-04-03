/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

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
    image: MicromagPropTypes.image,
    text: MicromagPropTypes.textComponent,
    background: MicromagPropTypes.backgroundComponent,
    box: MicromagPropTypes.boxComponent,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    image: null,
    text: null,
    box: null,
    background: null,
    renderFormat: 'view',
    className: null,
};

const Audio = ({ image, text, box, background, renderFormat, className }) => {
    const { width, height } = useScreenSize();
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.isSimple]: isSimple,
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    <Box {...box} {...(isSimple ? { spacing: 10 } : null)}>
                        <div className={styles.inner}>
                            {isSimple ? (
                                <Placeholders.Image />
                            ) : (
                                <ImageComponent {...image} className={styles.image} />
                            )}
                            {isSimple ? (
                                <div className={styles.placeholderTextContainer}>
                                    <Placeholders.ShortText className={styles.placeholder} />
                                </div>
                            ) : (
                                <div className={styles.textContainer}>
                                    <TextComponent {...text} />
                                </div>
                            )}
                        </div>
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default Audio;
