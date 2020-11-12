/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading, react/forbid-prop-types, no-param-reassign */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { useMediaApi } from '@micromag/core/hooks';

import styles from './styles.module.scss';

const propTypes = {
    media: MicromagPropTypes.videoMedia,
    width: PropTypes.number,
    height: PropTypes.number,
    apiRef: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.shape({
            current: PropTypes.any,
        }),
    ]),
    initialMuted: PropTypes.bool,
    autoPlay: PropTypes.bool,
    loop: PropTypes.bool,
    className: PropTypes.string,
    onReady: PropTypes.func,
    onTimeUpdate: PropTypes.func,
    onDurationChanged: PropTypes.func,
    onPlayChanged: PropTypes.func,
    onMuteChanged: PropTypes.func,
};

const defaultProps = {
    media: null,
    width: null,
    height: null,
    apiRef: null,
    initialMuted: false,
    autoPlay: false,
    loop: false,
    className: null,
    onReady: null,
    onTimeUpdate: null,
    onDurationChanged: null,
    onPlayChanged: null,
    onMuteChanged: null,
};

const Video = ({
    media,
    width,
    height,
    apiRef,
    initialMuted,
    autoPlay,
    loop,
    className,
    onReady,
    onTimeUpdate,
    onDurationChanged,
    onPlayChanged,
    onMuteChanged,
}) => {
    const { url = null } = media || {};
    const { ref, ...api } = useMediaApi({
        url,
        initialMuted,
    });

    if (apiRef !== null) {
        apiRef.current = api;
    }

    const {
        currentTime,
        duration,
        playing,
        muted,
        ready,
    } = api;

    useEffect( () => {
        if (onTimeUpdate !== null) {
            onTimeUpdate(currentTime);
        }
    }, [currentTime]);

    useEffect( () => {
        if (onDurationChanged !== null) {
            onDurationChanged(duration);
        }
    }, [duration]);

    useEffect( () => {
        if (onPlayChanged !== null) {
            onPlayChanged(playing);
        }
    }, [playing]);

    useEffect( () => {
        if (onMuteChanged !== null) {
            onMuteChanged(muted);
        }
    }, [muted]);

    useEffect(() => {
        if (ready && onReady !== null) {
            onReady();
        }
    }, [ready, onReady]);

    const withSize = width !== null && height !== null;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                    [styles.paused]: !playing,
                    [styles.withSize]: withSize,
                },
            ])}
            style={withSize ? {
                width,
                height,
            } : null }
        >
            <video ref={ref} src={url} autoPlay={autoPlay} loop={loop} />
        </div>
    );
};

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default React.forwardRef((props, ref) => <Video apiRef={ref} {...props} />);
