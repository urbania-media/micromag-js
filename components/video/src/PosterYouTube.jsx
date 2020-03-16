/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// import * as AppPropTypes from '../../lib/PropTypes';
import { isYouTube, getYouTubeVideoId } from './utils';
import Poster from './Poster';

import styles from './styles/poster.module.scss';

const propTypes = {
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    url: null,
    width: null,
    height: null,
    className: null,
};

const PosterYouTube = ({ url, width, height, className }) => {
    const videoId = getYouTubeVideoId(url);
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className,
                },
            ])}
            style={{
                width,
                height,
                backgroundImage: `url("https://img.youtube.com/vi/${videoId}/hqdefault.jpg")`,
            }}
        />
    );
};

PosterYouTube.propTypes = propTypes;
PosterYouTube.defaultProps = defaultProps;
PosterYouTube.testUrl = isYouTube;

Poster.registerPoster(PosterYouTube);

export default PosterYouTube;
