/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Background from '@micromag/element-background';
import Container from '@micromag/element-container';
import Stack from '@micromag/element-stack';
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

const GifScreen = ({
    video: videoField,
    defaultParams,
    box,
    background,
    visible,
    active,
    fit,
    renderFormat,
    className,
}) => {
    const { width, height } = useScreenSize();
    const { size } = fit || {};
    const { isPlaceholder, isView, isPreview, isEditor } = getRenderFormat(renderFormat);
    const isNonInteractive = isPreview || isPlaceholder;

    const { video = {} } = videoField || {};
    const { loop = false, autoPlay = false } = defaultParams || {};

    const PlaceholderSized = size === 'cover' ? Placeholders.VideoFull : Placeholders.Video;
    const PlaceholderLoop = loop ? Placeholders.VideoLoop : PlaceholderSized;
    const Placeholder = loop && size === 'cover' ? Placeholders.VideoFullLoop : PlaceholderLoop;
    const autoplayCondition = isEditor ? autoPlay && active : autoPlay && !isNonInteractive;

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

    const item = isNonInteractive ? (
        preview
    ) : (
        <VideoComponent
            params={{ ...defaultParams, autoPlay: autoplayCondition }}
            {...videoField}
            maxWidth={Math.min(width, 768)}
            maxHeight={height}
            fit={fit}
            showEmpty={isEditor}
            className={styles.video}
        />
    );

    const containerClassNames = classNames([
        styles.container,
        {
            [className]: className !== null,
        },
    ]);

    return (
        <div className={containerClassNames}>
            <Background
                {...(!isPlaceholder ? background : null)}
                width={width}
                height={height}
                playing={(isView && visible) || (isEditor && active)}
            />
            <div className={styles.content}>
                <Container width={width} height={height} visible={visible}>
                    <Stack {...box} className={styles.box}>
                        {item}
                    </Stack>
                </Container>
            </div>
        </div>
    );
};

GifScreen.propTypes = propTypes;
GifScreen.defaultProps = defaultProps;

export default React.memo(GifScreen);
