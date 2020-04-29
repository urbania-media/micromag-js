import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { getFileName } from '@micromag/core/utils';
import MediaGallery from '@micromag/media-gallery';

import styles from '../styles/image.module.scss';

const propTypes = {
    value: PropTypes.shape({
        url: PropTypes.string,
        caption: PropTypes.string,
        credits: PropTypes.string,
    }),
    isForm: PropTypes.string,
    className: PropTypes.string,
};

const defaultProps = {
    value: null,
    isForm: false,
    className: null,
};

const ImageField = ({ value, isForm, className }) => {
    const { image = null, url = null, caption = null } = value || {};
    const finalUrl = image !== null ? image.url || null : url;
    return isForm ? (
        <div
            className={classNames([
                styles.panel,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <MediaGallery isPicker />
        </div>
    ) : (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {finalUrl !== null ? (
                <>
                    <span className={styles.name}>{getFileName(finalUrl)}</span>
                    <img src={finalUrl} className={styles.thumbnail} alt={caption} />
                </>
            ) : (
                <span className={styles.noValue}>Sélectionnez une image</span>
            )}
        </div>
    );
};

ImageField.propTypes = propTypes;
ImageField.defaultProps = defaultProps;
ImageField.withForm = true;

export default ImageField;
