/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Video from '@micromag/component-video';
import Box from '@micromag/component-box';
import Grid from '@micromag/component-grid';
import Background from '@micromag/component-background';
import Frame from '@micromag/component-frame';
import TextComponent from '@micromag/component-text';
import { useScreenSize } from '@micromag/core/contexts';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    text: MicromagPropTypes.text,
    video: MicromagPropTypes.text,
    background: MicromagPropTypes.backgroundComponent,
    box: MicromagPropTypes.box,
    grid: MicromagPropTypes.box,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    isPlaceholder: PropTypes.bool,
    isPreview: PropTypes.bool,
    reverse: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    video: null,
    background: null,
    box: null,
    grid: null,
    textAlign: 'center',
    isPlaceholder: false,
    isPreview: true,
    reverse: false,
    className: null,
};

const TextVideoScreen = ({
    text,
    video,
    background,
    box,
    grid,
    textAlign,
    isPlaceholder,
    isPreview,
    reverse,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { spacing = 0 } = box || {};

    let videoSize = {};
    if (video && video.width && video.height) {
        if (video.width > width - spacing * 2) {
            videoSize = { width: width - spacing * 2 };
        }
    }

    const textElement = isPlaceholder ? (
        <Placeholders.Text className={styles.placeholder} />
    ) : (
        <TextComponent {...text} className={styles.text} />
    );

    const videoElement = isPlaceholder ? (
        <Placeholders.Video className={styles.placeholder} />
    ) : (
        <Video {...video} {...videoSize} className={styles.video} />
    );

    const items = reverse ? [textElement, videoElement] : [videoElement, textElement];

    return (
        <Background {...background} width={width} height={height}>
            <Frame width={width} height={height}>
                <div
                    className={classNames([
                        styles.container,
                        {
                            [styles.isPlaceholder]: isPlaceholder,
                            [styles.isPreview]: isPreview,
                            [styles[textAlign]]: textAlign !== null,
                            [className]: className !== null,
                        },
                    ])}
                >
                    {grid !== null ? (
                        <Grid {...grid} items={items} className={styles.box} />
                    ) : (
                        <Box {...box} items={items} className={styles.box} />
                    )}
                </div>
            </Frame>
        </Background>
    );
};

TextVideoScreen.propTypes = propTypes;
TextVideoScreen.defaultProps = defaultProps;

export default TextVideoScreen;
