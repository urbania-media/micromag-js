import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    color: MicromagPropTypes.color,
    image: MicromagPropTypes.image,
    video: MicromagPropTypes.video,
    playing: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: '100%',
    height: '100%',
    color: null,
    image: null,
    video: null,
    playing: true,
    className: null,
    children: null,
};

const Background = ({ width, height, color, image, video, playing, className, children }) => {
    let finalStyle = {
        width,
        height,
    };
    let videoUrl = null;
    let poster = null;
    let posterStyle = null;

    if (color !== null) {
        finalStyle = {
            ...finalStyle,
            ...getStyleFromColor(color, 'backgroundColor'),
        };
    }
    if (image !== null) {
        finalStyle = {
            ...finalStyle,
            backgroundImage: `url("${image.url}")`,
            backgroundSize: 'cover',
        };
    }
    if (video !== null) {
        const { url = null, thumbnail_url: thumbnail } = video || {};
        videoUrl = url;
        poster = thumbnail;
        posterStyle = {
            backgroundImage: `url("${thumbnail}")`,
            backgroundSize: 'cover',
        };
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
        >
            {videoUrl !== null && playing ? (
                <video
                    className={styles.video}
                    src={videoUrl}
                    playsinline
                    autoPlay
                    muted
                    loop
                    poster={poster}
                />
            ) : null}
            {videoUrl !== null && !playing ? (
                <div className={styles.poster} src={poster} style={posterStyle} />
            ) : null}
            {children}
        </div>
    );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default Background;
