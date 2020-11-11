/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useMediaApi } from '@micromag/core/hooks';

import styles from './styles/video.module.scss';

const propTypes = {
    media: MicromagPropTypes.videoMedia,
    apiRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    initialMuted: PropTypes.bool,
    initialVolume: PropTypes.number,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    className: PropTypes.string,
    onReady: PropTypes.func,
};

const defaultProps = {
    media: null,
    apiRef: null,
    initialMuted: false,
    initialVolume: 1,
    autoPlay: false,
    loop: false,
    className: null,
    onReady: null,
};

const Video = ({
    media,
    apiRef,
    initialMuted,
    initialVolume,
    autoPlay,
    loop,
    className,
    onReady,
}) => {
    const { url = null } = media || {};

    // use api

    const {
        ref,
        api,
        muted,
        paused,
        ready,
    } = useMediaApi({
        url,
        initialMuted,
        initialVolume,
    });

    // expose api    

    if (apiRef !== null) {
        apiRef.current = api;
    }

    useEffect(() => {
        if (ready && onReady !== null) {
            onReady();
        }
    }, [ready, onReady]);

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.paused]: paused,
                    [styles.muted]: muted,
                },
            ])}
        >
            <video ref={ref} autoPlay={autoPlay} loop={loop} />
        </div>
    );
};

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Video apiRef={ref} {...props} />);
