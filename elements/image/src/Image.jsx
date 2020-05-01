/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
// import { getSizeWithinBounds } from '@folklore/size';

import styles from './styles.module.scss';

const propTypes = {
    image: PropTypes.shape({
        url: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
    }),
    caption: PropTypes.string,
    credits: PropTypes.string,
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    maxHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fit: MicromagPropTypes.objectFit,
    showEmpty: PropTypes.bool,
    className: PropTypes.string,
    imageClassName: PropTypes.string,
    emptyClassName: PropTypes.string,
};

const defaultProps = {
    image: {
        url: null,
        width: null,
        height: null,
    },
    caption: null,
    credits: null,
    maxWidth: null,
    maxHeight: null,
    fit: null,
    showEmpty: false,
    className: null,
    imageClassName: null,
    emptyClassName: null,
};

const Image = ({
    image,
    caption,
    credits,
    maxWidth,
    maxHeight,
    fit,
    showEmpty,
    className,
    imageClassName,
    emptyClassName,
}) => {
    const { url = null } = image || {};
    // Much simpler now, to test
    const { size = 'contain' } = fit || {};

    const imageElement = url ? (
        <img
            src={url}
            alt={credits || 'Image'}
            className={classNames([
                styles.img,
                {
                    [imageClassName]: imageClassName !== null,
                    [imageClassName]: imageClassName !== null,
                },
            ])}
            style={{ objectFit: size }}
        />
    ) : null;

    const img =
        showEmpty && !url ? (
            <div
                className={classNames([
                    styles.showEmpty,
                    {
                        [emptyClassName]: emptyClassName !== null,
                    },
                ])}
            />
        ) : (
            imageElement
        );
    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
            style={{ width: maxWidth, height: maxHeight }}
        >
            {img}
            {url && caption ? (
                <div className={styles.credits}>
                    <span className={styles.text}>{caption}</span>
                </div>
            ) : null}
        </div>
    );
};

Image.propTypes = propTypes;
Image.defaultProps = defaultProps;

export default Image;
