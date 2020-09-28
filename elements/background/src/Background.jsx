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
    className,
    children,
}) => {
    const finalStyle = {
        width,
        height,
        ...getStyleFromColor(color),
    };

    if (image !== null) {
        finalStyle.backgroundImage = `url("${image.url}")`;
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
            {video !== null ? <Video video={video} className={styles.video} /> : null}
            <div className={styles.content}>{children}</div>
        </div>
    );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default Background;
