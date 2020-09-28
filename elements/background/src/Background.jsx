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
    horizontalPosition: PropTypes.string,
    verticalPosition: PropTypes.string,
    cover: PropTypes.bool,
    repeat: PropTypes.bool,
    color: MicromagPropTypes.color,
    image: MicromagPropTypes.image,
    video: MicromagPropTypes.video,
    className: PropTypes.string,
    children: PropTypes.node,
};

const defaultProps = {
    width: null,
    height: null,
    horizontalPosition: 'center',
    verticalPosition: 'center',
    cover: false,
    repeat: false,
    color: null,
    image: null,
    video: null,
    className: null,
    children: null,
};

const Background = ({
    width,
    height,
    color,
    image,
    video,
    className,
    children,
    horizontalPosition,
    verticalPosition,
    cover,
    repeat,
}) => {
    const finalStyle = {
        width,
        height,
        ...getStyleFromColor(color),
    };

    if (image !== null) {
        finalStyle.backgroundImage = `url("${image.url}")`;
        finalStyle.backgroundRepeat = repeat ? 'repeat' : 'no-repeat';
        finalStyle.backgroundPosition = [horizontalPosition, verticalPosition].join(' ');

        if (cover) {
            finalStyle.backgroundSize = 'cover';
        } else {
            finalStyle.backgroundSize = color || repeat ? 'contain' : 'auto';
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
            {video !== null ? <Video video={video} className={styles.video} /> : null}
            <div className={styles.content}>{children}</div>
        </div>
    );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default Background;
