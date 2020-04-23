/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Video from '@micromag/element-video';
import Box from '@micromag/element-box';
import Grid from '@micromag/element-grid';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import TextComponent from '@micromag/element-text';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    text: MicromagPropTypes.text,
    video: MicromagPropTypes.text,
    background: MicromagPropTypes.backgroundElement,
    box: MicromagPropTypes.boxElement,
    grid: MicromagPropTypes.boxElement,
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
    const { isPlaceholder, isSimple } = getRenderFormat(renderFormat);

    let videoSize = {};
    if (video && video.width && video.height) {
        if (video.width > width - spacing * 2) {
            videoSize = { width: width - spacing * 2 };
        }
    }

    const textElement = isPlaceholder ? (
        <Placeholders.Text key="text-element" className={styles.placeholderText} />
    ) : (
        <TextComponent {...text} key="text-element" className={styles.text} />
    );

    const videoElement = isSimple ? (
        <Placeholders.Video key="video-element" className={styles.placeholderVideo} />
    ) : (
        <Video {...video} {...videoSize} key="video-element" className={styles.video} />
    );

    const items = reverse ? [textElement, videoElement] : [videoElement, textElement];

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [styles.disabled]: isSimple,
                    [styles[textAlign]]: textAlign !== null,
                    [className]: className !== null,
                },
            ])}
        >
            <Background {...background} width={width} height={height}>
                <Frame width={width} height={height}>
                    {grid !== null ? (
                        <Grid
                            {...grid}
                            items={items}
                            withSmallSpacing={isSimple}
                            className={styles.box}
                        />
                    ) : (
                        <Box {...box} withSmallSpacing={isSimple} className={styles.box}>
                            {items}
                        </Box>
                    )}
                </Frame>
            </Background>
        </div>
    );
};

TextVideoScreen.propTypes = propTypes;
TextVideoScreen.defaultProps = defaultProps;

export default React.memo(TextVideoScreen);
