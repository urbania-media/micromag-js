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
    reverse: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    text: null,
    video: null,
    background: null,
    box: null,
    grid: null,
    textAlign: 'center',
    reverse: false,
    renderFormat: 'view',
    className: null,
};

const TextVideoScreen = ({
    text,
    video,
    background,
    box,
    grid,
    textAlign,
    renderFormat,
    reverse,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { spacing = 0 } = box || {};
    const isSimple = renderFormat === 'placeholder' || renderFormat === 'preview';

    let videoSize = {};
    if (video && video.width && video.height) {
        if (video.width > width - spacing * 2) {
            videoSize = { width: width - spacing * 2 };
        }
    }

    const textElement = isSimple ? (
        <Placeholders.Text className={styles.placeholder} />
    ) : (
        <TextComponent {...text} className={styles.text} />
    );

    const videoElement = isSimple ? (
        <Placeholders.Video className={styles.placeholder} />
    ) : (
        <Video {...video} {...videoSize} className={styles.video} />
    );

    const items = reverse ? [textElement, videoElement] : [videoElement, textElement];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    {grid !== null ? (
                        <Grid {...grid} items={items} className={styles.box} />
                    ) : (
                        <Box {...box} items={items} className={styles.box} />
                    )}
                </Frame>
            </Background>
        </div>
    );
};

TextVideoScreen.propTypes = propTypes;
TextVideoScreen.defaultProps = defaultProps;

export default TextVideoScreen;
