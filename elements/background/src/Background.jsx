/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getStyleFromColor } from '@micromag/core/utils';
import Video from '@micromag/element-video';

import styles from './styles.module.scss';

const propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fit: PropTypes.bool,
    noResize: PropTypes.bool,
    horizontalAlign: PropTypes.string,
    verticalAlign: PropTypes.string,
    repeat: PropTypes.bool,
    color: MicromagPropTypes.color,
    image: MicromagPropTypes.image,
    video: MicromagPropTypes.video,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    muted: PropTypes.bool,
    controls: MicromagPropTypes.controls,
    maxRatio: PropTypes.number,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: null,
    height: null,
    fit: false,
    noResize: false,
    horizontalAlign: 'center',
    verticalAlign: 'center',
    repeat: false,
    color: null,
    image: null,
    video: null,
    autoPlay: true,
    loop: true,
    muted: true,
    controls: false,
    maxRatio: null,
    className: null,
    children: null,
};

const Background = ({
    width,
    height,
    fit,
    noResize,
    horizontalAlign,
    verticalAlign,
    repeat,
    color,
    image,
    video,
    autoPlay,
    loop,
    muted,
    controls,
    maxRatio,
    className,
    children,
}) => {

    const currentRatio = width / height;
    const boxedWidth = maxRatio !== null && currentRatio > maxRatio ? height * maxRatio : width;
    // à utiliser pour les background complexes en desktop (video/image blur)

    const finalStyle = {
        width,
        height,
        ...getStyleFromColor(color),
    };

    if (image !== null) {
        finalStyle.backgroundImage = `url("${image.media.url}")`;
        finalStyle.backgroundRepeat = repeat ? 'repeat' : 'no-repeat';
        finalStyle.backgroundPosition = [horizontalAlign, verticalAlign].join(' ');

        if (fit) {
            finalStyle.backgroundSize = 'cover';
        } else if (noResize) {
            finalStyle.backgroundSize = 'auto';
        } else {
            finalStyle.backgroundSize = 'contain';
        }
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
            {video !== null ? (
                <Video
                    video={video}
                    className={styles.video}
                    autoPlay={autoPlay}
                    loop={loop}
                    muted={muted}
                    controls={controls}
                    width={width}
                    height={height}
                />
            ) : null}
            <div className={styles.content}>{children}</div>
        </div>
    );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default Background;
