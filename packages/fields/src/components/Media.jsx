import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { defineMessages } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';
import MediaGallery from '@micromag/media-gallery';

import styles from '../styles/media.module.scss';

const messages = defineMessages({
    noValue: {
        id: 'media.no_value',
        defaultMessage: 'Select a media...',
    },
});

const propTypes = {
    type: PropTypes.oneOf(['image', 'video', 'audio']),
    value: MicromagPropTypes.media,
    isForm: PropTypes.string,
    noValueLabel: MicromagPropTypes.label,
    withoutThumbnail: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    type: null,
    value: null,
    isForm: false,
    noValueLabel: messages.noValue,
    withoutThumbnail: false,
    className: null,
    onChange: null,
    closeForm: null,
};

const MediaField = ({
    type,
    value,
    isForm,
    noValueLabel,
    withoutThumbnail,
    className,
    onChange,
    closeForm,
}) => {
    const { name = null, thumbnail_url: thumbnailUrl = null } = value || {};
    const onClickMedia = useCallback(
        media => {
            if (onChange !== null) {
                onChange(media !== null && value !== null && media.id === value.id ? null : media);
            }
            if (closeForm !== null) {
                closeForm();
            }
        },
        [value, onChange, closeForm],
    );
    return isForm ? (
        <MediaGallery
            type={type}
            isPicker
            isSmall
            selectedMedia={value}
            onClickMedia={onClickMedia}
        />
    ) : (
        <div
            className={classNames([
                styles.container,
                {
                    [className]: className !== null,
                },
            ])}
        >
            {name !== null || (!withoutThumbnail && thumbnailUrl !== null) ? (
                <>
                    <span className={styles.value}>{name}</span>
                    {!withoutThumbnail ? (
                        <img src={thumbnailUrl} className={styles.thumbnail} alt={name} />
                    ) : null}
                </>
            ) : (
                <span className={styles.noValue}>
                    <Label>{noValueLabel}</Label>
                </span>
            )}
        </div>
    );
};

MediaField.propTypes = propTypes;
MediaField.defaultProps = defaultProps;
MediaField.withForm = true;

export default MediaField;
