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
    videoParams: PropTypes.shape({
        controls: PropTypes.bool,
        autoPlay: PropTypes.bool,
        muted: PropTypes.bool,
        loop: PropTypes.bool,
    }),
    background: MicromagPropTypes.backgroundElement,
    box: MicromagPropTypes.boxElement,
    fit: PropTypes.shape({
        size: PropTypes.string,
    }),
    visible: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    className: PropTypes.string,
};

const defaultProps = {
    video: null,
    videoParams: null,
    background: null,
    box: null,
    fit: false,
    visible: true,
    active: false,
    renderFormat: 'view',
    className: null,
};

const VideoScreen = ({
    video: videoField,
    videoParams,
    background,
    box,
    fit,
    visible,
    active,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { size } = fit || {};
    const { isPlaceholder, isSimple, isEditor, isView } = getRenderFormat(renderFormat);
    const { video = {} } = videoField || {};
    const { loop = false, autoPlay = false, muted = false, controls = true } = videoParams || {};

    const placeholderSized = size === 'cover' ? Placeholders.VideoFull : Placeholders.Video;
    const Placeholder = loop ? Placeholders.VideoLoop : placeholderSized;
    const autoplayCondition = isEditor ? autoPlay && active : autoPlay && !isSimple;

    const item = isSimple ? (
        <Placeholder className={styles.placeholder} />
    ) : (
        <VideoComponent
            video={video}
            maxWidth={Math.min(width, 768)}
            maxHeight={height}
            autoPlay={autoplayCondition}
            muted={muted}
            loop={loop}
            controlsVisible={controls}
            fit={fit}
            showEmpty={isEditor}
            className={styles.video}
        />
    );

    return (
        <Background
            {...(!isPlaceholder ? background : null)}
            width={width}
            height={height}
            playing={(isView && visible) || (isEditor && active)}
            className={styles.background}
        >
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
                    <Box {...box} withSmallSpacing={isSimple} spacing={0} className={styles.box}>
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
