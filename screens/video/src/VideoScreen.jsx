/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Box from '@micromag/element-box';
import Background from '@micromag/element-background';
import Frame from '@micromag/element-frame';
import Image from '@micromag/element-image';
import VideoComponent from '@micromag/element-video';
import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, Placeholders } from '@micromag/core';

import styles from './styles.module.scss';

const propTypes = {
    video: MicromagPropTypes.video,
    defaultParams: PropTypes.shape({
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
    defaultParams: null,
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
    defaultParams,
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
    const { isPlaceholder, isPreview, isSimple, isEditor, isView } = getRenderFormat(renderFormat);

    const { video = {} } = videoField || {};
    const { loop = false, autoPlay = false } = defaultParams || {};

    const PlaceholderSized = size === 'cover' ? Placeholders.VideoFull : Placeholders.Video;
    const PlaceholderLoop = loop ? Placeholders.VideoLoop : PlaceholderSized;
    const Placeholder = loop && size === 'cover' ? Placeholders.VideoFullLoop : PlaceholderLoop;
    const autoplayCondition = isEditor ? autoPlay && active : autoPlay && !isSimple;

    const preview =
        isPreview && video.thumbnail_url && video.metadata ? (
            <Image
                image={{ url: video.thumbnail_url, metadata: video.metadata }}
                className={classNames([styles.preview])}
            />
        ) : (
            <Placeholder
                className={classNames([
                    styles.placeholder,
                    {
                        [styles.cover]: size === 'cover',
                    },
                ])}
            />
        );

    const item = isSimple ? (
        preview
    ) : (
        <VideoComponent
            videoParams={{ ...defaultParams, autoPlay: autoplayCondition }}
            {...videoField}
            maxWidth={Math.min(width, 768)}
            maxHeight={height}
            fit={fit}
            showEmpty={isEditor}
            className={styles.video}
        />
    );

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
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
                className={styles.background}
            >
                <Frame width={width} height={height} visible={visible}>
                    <Box {...box} withSmallSpacing={isSimple} spacing={0} className={styles.box}>
                        {item}
                    </Box>
                </Frame>
            </Background>
        </div>
    );
};

VideoScreen.propTypes = propTypes;
VideoScreen.defaultProps = defaultProps;

export default React.memo(VideoScreen);
