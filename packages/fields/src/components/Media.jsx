import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { Label } from '@micromag/core/components';
import MediaGallery from '@micromag/media-gallery';

import styles from '../styles/media.module.scss';

const propTypes = {
    type: PropTypes.oneOf(['image', 'video', 'audio']),
    value: MicromagPropTypes.media,
    isForm: PropTypes.bool,
    noValueLabel: MicromagPropTypes.label,
    withoutThumbnail: PropTypes.bool,
    isHorizontal: PropTypes.bool,
    className: PropTypes.string,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    type: null,
    value: null,
    isForm: false,
    noValueLabel: (
        <FormattedMessage
            defaultMessage="Select a media..."
            description="Label when no value is provided to Media field"
        />
    ),
    withoutThumbnail: false,
    isHorizontal: false,
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
    isHorizontal,
    className,
    onChange,
    closeForm,
}) => {
    const { name = null, thumbnail_url: thumbnailUrl = null } = value || {};
    const onClickMedia = useCallback(
        (media) => {
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
                'd-flex',
                'align-items-center',
                {
                    [className]: className !== null,
                },
            ])}
        >
            {name !== null || (!withoutThumbnail && thumbnailUrl !== null) ? (
                <>
                    {!isHorizontal && !withoutThumbnail ? (
                        <img src={thumbnailUrl} className={styles.thumbnail} alt={name} />
                    ) : null}
                    <span
                        className={classNames([
                            'text-monospace',
                            'text-truncate',
                            {
                                'ml-2': !isHorizontal && !withoutThumbnail,
                                'mr-2': isHorizontal && !withoutThumbnail,
                            },
                        ])}
                    >
                        {name}
                    </span>
                    {isHorizontal && !withoutThumbnail ? (
                        <img src={thumbnailUrl} className={styles.thumbnail} alt={name} />
                    ) : null}
                </>
            ) : (
                <span className="text-muted">
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
