import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MediaGallery from '@micromag/media-gallery';
import { Label } from '@micromag/core/components';

import { PropTypes as MicromagPropTypes } from '@micromag/core';

import styles from '../styles/image.module.scss';

const propTypes = {
    value: PropTypes.shape({
        url: PropTypes.string,
        caption: PropTypes.string,
        credits: PropTypes.string,
    }),
    isForm: PropTypes.string,
    thumbnailLabel: MicromagPropTypes.label,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    thumbnailLabel: null,
    className: null,
    onChange: null,
};

const ImageField = ({ value, isForm, thumbnailLabel, className, onChange }) => {
    const { name = null, thumbnail_url: thumbnailUrl = null } = value || {};
    return isForm ? (
        <div
            className={classNames([
                styles.panel,
                {
                    [className]: className !== null,
                },
            ])}
        >
            <MediaGallery type="image" isPicker isSmall onClickMedia={onChange} />
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
            {thumbnailUrl !== null ? (
                <>
                    <span className={styles.value}>{name}</span>
                    <img src={thumbnailUrl} className={styles.thumbnail} alt={name} />
                </>
            ) : (
                <span className={styles.noValue}>
                    {thumbnailLabel !== null ? (
                        <Label>{thumbnailLabel}</Label>
                    ) : (
                        'Sélectionnez une image'
                    )}
                </span>
            )}
        </div>
    );
};

ImageField.propTypes = propTypes;
ImageField.defaultProps = defaultProps;
ImageField.withForm = true;

export default ImageField;
