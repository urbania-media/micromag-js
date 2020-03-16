/* eslint-disable react/no-array-index-key, jsx-a11y/media-has-caption, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './styles/poster.module.scss';

const propTypes = {
    url: PropTypes.string,
    posters: PropTypes.arrayOf(PropTypes.elementType),
    width: PropTypes.number,
    height: PropTypes.number,
    className: PropTypes.string,
};

const defaultProps = {
    url: null,
    posters: null,
    width: null,
    height: null,
    className: null,
};

const Poster = ({ posters, url, width, height, className }) => {
    const finalPosters = posters || Poster.defaultPosters;
    const PosterComponent = url !== null ? finalPosters.find(it => it.testUrl(url)) || null : null;
    return PosterComponent !== null ? (
        <PosterComponent
            url={url}
            width={width}
            height={height}
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        />
    ) : null;
};

Poster.propTypes = propTypes;
Poster.defaultProps = defaultProps;
Poster.defaultPosters = [];
Poster.registerPoster = PosterComponent => {
    const playerIndex = Poster.defaultPosters.findIndex(it => it === PosterComponent);
    if (playerIndex === -1) {
        Poster.defaultPosters = [...Poster.defaultPosters, PosterComponent];
    }
};

export default Poster;
