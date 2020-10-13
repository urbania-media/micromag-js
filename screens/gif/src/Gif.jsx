/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Image from '@micromag/element-image';
import VideoComponent from '@micromag/element-video';

import { useScreenSize } from '@micromag/core/contexts';
import { getRenderFormat } from '@micromag/core/utils';
import { PropTypes as MicromagPropTypes, PlaceholderVideoLoop } from '@micromag/core';
import Transitions from '@micromag/core/src/components/transitions/Transitions';

import styles from './styles.module.scss';

export const layouts = ['center', 'full'];

const propTypes = {
    layout: PropTypes.oneOf(layouts),
    video: MicromagPropTypes.video,
    defaultParams: PropTypes.shape({
        controls: PropTypes.bool,
        autoPlay: PropTypes.bool,
        muted: PropTypes.bool,
        loop: PropTypes.bool,
    }),
    background: MicromagPropTypes.backgroundElement,
    current: PropTypes.bool,
    active: PropTypes.bool,
    renderFormat: MicromagPropTypes.renderFormat,
    maxRatio: PropTypes.number,
    transitions: MicromagPropTypes.transitions,
    className: PropTypes.string,
};

const defaultProps = {
    layout: 'center',
    video: null,
    defaultParams: null,
    background: null,
    current: true,
    active: false,
    renderFormat: 'view',
    maxRatio: 3 / 4,
    transitions: {
        in: {
            name: 'fade',
            duration: 1000,
        },
        out: 'scale',
    },
    className: null,
};

const Gif = ({
    layout,
    video: videoField,
    defaultParams,
    background,
    current,
    active,
    renderFormat,
    maxRatio,
    transitions,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { isPlaceholder, isView, isPreview, isEditor } = getRenderFormat(renderFormat);
    const isNonInteractive = isPreview || isPlaceholder;

    const { video = null } = videoField || {};
    const { autoPlay = false } = defaultParams || {};    
    const isFullScreen = layout === 'full';

    const autoplayCondition = isEditor ? autoPlay && active : autoPlay && !isNonInteractive;

    const withVideo = video !== null;
    
    const [ready, setReady] = useState(!withVideo || true);// @TODO
    const transitionPlaying = current && ready;
    const onVideoReady = useCallback(() => {
        setReady(true);
    }, [setReady]);

    const preview =
        isPreview && video !== null && video.thumbnail_url && video.metadata ? (
            <Image
                image={{ url: video.thumbnail_url, metadata: video.metadata }}
                className={classNames([styles.preview])}
            />
        ) : (
            <PlaceholderVideoLoop
                className={styles.placeholder}
                width={isFullScreen ? '100%' : undefined }
                height={isFullScreen ? '100%' : undefined }
            />
        );

    const item = isNonInteractive ? (
        preview
    ) : (
        <Transitions transitions={transitions} playing={transitionPlaying}>
            <VideoComponent
                params={{ ...defaultParams, autoPlay: autoplayCondition }}
                {...video}
                fit={{ size: isFullScreen ? 'cover' : 'contain' }}
                showEmpty={isEditor}
                className={styles.video}
                onReady={onVideoReady}
            />
        </Transitions>
    );

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.placeholder]: isPlaceholder,
                    [styles.fullscreen]: isFullScreen,
                },
            ])}
        >
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && current) || (isEditor && active)}
                maxRatio={maxRatio}
            />

            <Container width={width} height={height} maxRatio={maxRatio}>
                <div
                    className={styles.content}
                >
                    {item}
                </div>
            </Container>
        </div>
    );
};

Gif.propTypes = propTypes;
Gif.defaultProps = defaultProps;

export default React.memo(Gif);
