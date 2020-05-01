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
    text: MicromagPropTypes.textElement,
    video: MicromagPropTypes.videoElement,
    background: MicromagPropTypes.backgroundElement,
    box: MicromagPropTypes.boxElement,
    grid: MicromagPropTypes.boxElement,
    textAlign: PropTypes.oneOf(['left', 'right', 'center']),
    reverse: PropTypes.bool,
    visible: PropTypes.bool,
    active: PropTypes.bool,
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
    visible: true,
    active: false,
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
    reverse,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { spacing = 10 } = box || {};
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);
    const showEmpty = text === null && video === null;

    let videoSize = {};
    if (video) {
        videoSize = {
            maxWidth: Math.min(width, 768) - spacing * 2,
            maxHeight: Math.min(height, 400) - spacing * 2,
        };
    }

    const textElement = isPlaceholder ? (
        <Placeholders.Text key="text-element" className={styles.placeholderText} />
    ) : (
        <TextComponent
            {...text}
            key="text-element"
            showEmpty={isEditor && showEmpty}
            className={styles.text}
            emptyClassName={styles.empty}
        />
    );

    const videoElement = isSimple ? (
        <Placeholders.Video key="video-element" className={styles.placeholderVideo} />
    ) : (
        <Video
            {...video}
            {...videoSize}
            key="video-element"
            fit={{ size: 'contain' }}
            showEmpty={isEditor && showEmpty}
            className={styles.video}
            emptyClassName={styles.empty}
        />
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
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
                className={styles.background}
            >
                <Frame width={width} height={height} visible={visible}>
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
