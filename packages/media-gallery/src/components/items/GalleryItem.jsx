/* eslint-disable react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { faPlayCircle, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Button } from '@micromag/core';

import styles from '../../styles/items/gallery-item.module.scss';

const propTypes = {
    withInfoButton: PropTypes.bool,
    item: PropTypes.shape({
        type: PropTypes.string,
        url: PropTypes.string,
        filename: PropTypes.string,
    }),
    onClick: PropTypes.func,
    onClickInfo: PropTypes.func,
    className: PropTypes.string,
};

const defaultProps = {
    withInfoButton: false,
    item: null,
    onClick: null,
    onClickInfo: null,
    className: null,
};

const GalleryItem = ({ withInfoButton, item, onClick, onClickInfo, className }) => {
    const { type, url, filename } = item;

    return (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <Button
                className={classNames([
                    styles.imageContainer,
                    {
                        [className]: className !== null,
                    },
                ])}
                withoutStyle
                onClick={onClick}
            >
                <div className={styles.thumbnailContainer}>
                    <div className={styles.thumbnailInner}>
                        <div
                            className={styles.thumbnail}
                            style={{
                                backgroundImage: `url("${url}")`,
                            }}
                        />
                        {type === 'video' ? (
                            <FontAwesomeIcon className={styles.videoIcon} icon={faPlayCircle} />
                        ) : null}
                        <div className={styles.filename}> {filename} </div>
                    </div>
                </div>
            </Button>
            {withInfoButton ? (
                <button value={filename} className={styles.infoButton} onClick={onClickInfo}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                </button>
            ) : null}
        </div>
    );
};

GalleryItem.propTypes = propTypes;
GalleryItem.defaultProps = defaultProps;

export default GalleryItem;
