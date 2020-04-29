/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@micromag/element-box';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import VideoComponent from '@micromag/element-video';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    video: MicromagPropTypes.video,
    background: MicromagPropTypes.backgroundElement,
    box: MicromagPropTypes.boxElement,
    autoPlay: PropTypes.bool,
    muted: PropTypes.bool,
    loop: PropTypes.bool,
    controls: PropTypes.bool,
    fit: PropTypes.shape({
        size: PropTypes.string,
    }),
    visible: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    video: null,
    background: null,
    box: null,
    loop: false,
    autoPlay: false,
    muted: false,
    controls: false,
    fit: false,
    visible: true,
    renderFormat: 'view',
    className: null,
};

const VideoScreen = ({
    video,
    background,
    box,
    autoPlay,
    muted,
    loop,
    controls,
    fit,
    visible,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { size } = fit || {};
    const { isSimple, isEditor } = getRenderFormat(renderFormat);

    const placeholderSized = size === 'cover' ? Placeholders.VideoFull : Placeholders.Video;
    const Placeholder = loop ? Placeholders.VideoLoop : placeholderSized;

    const item = isSimple ? (
        <Placeholder className={styles.placeholder} />
    ) : (
        <VideoComponent
            {...video}
            maxWidth={Math.min(width - 40, 768 - 40)}
            maxHeight={height}
            autoPlay={autoPlay}
            muted={muted}
            loop={loop}
            controlsVisible={controls}
            fit={fit}
            showEmpty={isEditor}
            className={styles.video}
        />
    );

    return (
        <Background {...background} width={width} height={height}>
            <Frame width={width} height={height} visible={visible}>
                <div
                    className={classNames([
                        styles.container,
                        {
                            [styles.disabled]: isSimple,
                            [className]: className !== null,
                        },
                    ])}
                >
                    <Box {...box} withSmallSpacing={isSimple} className={styles.box}>
                        {item}
                    </Box>
                </div>
            </Frame>
        </Background>
    );
};

VideoScreen.propTypes = propTypes;
VideoScreen.defaultProps = defaultProps;

export default React.memo(VideoScreen);
