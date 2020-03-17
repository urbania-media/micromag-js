/* eslint-disable jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
// import { useScreenSize } from '@micromag/core/contexts';

import styles from './styles.module.scss';

const propTypes = {
    src: PropTypes.string,
    track: PropTypes.string,
    trackLng: PropTypes.string,
    controls: PropTypes.bool,
    className: PropTypes.string,
};

const defaultProps = {
    src: null,
    track: null,
    trackLng: null,
    controls: true,
    className: null,
};

const Audio = ({ src, track, trackLng, controls, className }) => {
    // const { width, height } = useScreenSize();
    const props = {
        controls,
    };
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <div className={styles.inner}>
                <audio {...props} src={src}>
                    {track !== null ? (
                        <track default kind="captions" srcLang={trackLng} src={track} />
                    ) : null}
                </audio>
            </div>
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default Audio;
