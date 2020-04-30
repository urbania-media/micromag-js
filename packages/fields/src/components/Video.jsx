import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MediaGallery from '@micromag/media-gallery';

import styles from '../styles/video.module.scss';

const propTypes = {
    value: PropTypes.shape({
        url: PropTypes.string,
        caption: PropTypes.string,
        credits: PropTypes.string,
    }),
    isForm: PropTypes.string,
    className: PropTypes.string,
    onChange: PropTypes.func,
};

const defaultProps = {
    value: null,
    isForm: false,
    className: null,
    onChange: null,
};

const VideoField = ({ value, isForm, className, onChange }) => {
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
            <MediaGallery type="video" isPicker isSmall onClickMedia={onChange} />
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
                    <span className={styles.name}>{name}</span>
                    <img src={thumbnailUrl} className={styles.thumbnail} alt={name} />
                </>
            ) : (
                <span className={styles.noValue}>Sélectionnez une vidéo</span>
            )}
        </div>
    );
};

VideoField.propTypes = propTypes;
VideoField.defaultProps = defaultProps;
VideoField.withForm = true;

export default VideoField;
