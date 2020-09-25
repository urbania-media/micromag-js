import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor } from '@micromag/core/utils';
import Video from '@micromag/element-video';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    horizontalPosition: PropTypes.string,
    verticalPosition: PropTypes.string,
    cover: PropTypes.bool,
    repeat: PropTypes.bool,
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
    horizontalPosition: 'center',
    verticalPosition: 'center',
    cover: false,
    repeat: false,
    color: null,
    image: null,
    video: null,
    playing: true,
    className: null,
    children: null,
};

const Background = ({
    width,
    height,
    color,
    image,
    video,
    playing,
    className,
    children,
    horizontalPosition,
    verticalPosition,
    cover,
    repeat,
}) => {
    const finalStyle = useRef({
        width,
        height,
    });
    const videoUrl = useRef();
    const poster = useRef();
    const posterStyle = useRef({});

    if (color !== null) {
        const colorStyle = getStyleFromColor(color);
        finalStyle.current = { ...finalStyle.current, ...colorStyle };
    }

    if (image !== null) {
        finalStyle.current.backgroundImage = `url("${image.url}")`;
        finalStyle.current.backgroundRepeat = repeat ? 'repeat' : 'no-repeat';
        finalStyle.current.backgroundPosition = [horizontalPosition, verticalPosition].join(' ');

        if (cover) {
            finalStyle.current.backgroundSize = 'cover';
        } else {
            finalStyle.current.backgroundSize = color || repeat ? 'contain' : 'auto';
        }
    }

    if (video !== null) {
        const { url = null, thumbnail_url: thumbnail } = video || {};
        videoUrl.current = url;
        poster.current = thumbnail;
        posterStyle.current.backgroundImage = `url("${thumbnail}")`;
        posterStyle.current.backgroundSize = 'cover';
        posterStyle.current.backgroundPosition = [horizontalPosition, verticalPosition].join(' ');
    }

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalStyle.current}
        >
            {videoUrl !== null && playing ? <Video video={video} className={styles.video} controlsVisible={false} autoPlay loop/> : null}
            {videoUrl !== null && !playing ? (
                <div className={styles.poster} src={poster} style={posterStyle.current} />
            ) : null}
            {children}
        </div>
    );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default Background;
