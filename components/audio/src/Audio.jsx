/* eslint-disable react/no-array-index-key, jsx-a11y/media-has-caption */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';
import classNames from 'classnames';
// import { PropTypes as MicromagPropTypes } from '@micromag/core';
// import { getStyleFromFont, getStyleFromColor, getStyleFromMargin } from '@micromag/core/utils';

import styles from './styles.module.scss';

const propTypes = {
    src: PropTypes.string,
    track: PropTypes.string,
    language: PropTypes.number,
    controls: PropTypes.bool,
    // style: MicromagPropTypes.textStyle,
    className: PropTypes.string,
};

const defaultProps = {
    src: null,
    track: null,
    language: null,
    controls: true,
    // style: null,
    className: null,
};

const Audio = ({ src, track, language, controls, className }) => {
    const finalStyle = {};
    const id = useMemo(() => (finalStyle !== null ? `text-component-${uuid()}` : null), [
        finalStyle !== null,
    ]);
    return (
        <div
            id={id}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={finalStyle}
        >
            <audio className={styles.audio} src={src} controls={controls}>
                {track !== null ? (
                    <track default kind="captions" srcLang={language} src={track} />
                ) : null}
            </audio>
        </div>
    );
};

Audio.propTypes = propTypes;
Audio.defaultProps = defaultProps;

export default Audio;
