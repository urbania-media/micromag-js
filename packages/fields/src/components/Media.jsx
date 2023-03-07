/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import { FormattedMessage } from 'react-intl';

import { PropTypes as MicromagPropTypes } from '@micromag/core';
import { getFileName } from '@micromag/core/utils';
import MediaGallery from '@micromag/media-gallery';

import FieldWithForm from './FieldWithForm';

const propTypes = {
    type: PropTypes.oneOfType([
        MicromagPropTypes.mediaTypes,
        PropTypes.arrayOf(MicromagPropTypes.mediaTypes),
    ]),
    value: MicromagPropTypes.media,
    noValueLabel: MicromagPropTypes.label,
    withoutThumbnail: PropTypes.bool,
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    type: null,
    value: null,
    noValueLabel: (
        <FormattedMessage
            defaultMessage="Select a media..."
            description="Label when no value is provided to Media field"
        />
    ),
    withoutThumbnail: false,
    onChange: null,
    closeForm: null,
};

const MediaField = ({
    type,
    value,
    noValueLabel,
    withoutThumbnail,
    onChange,
    closeForm,
    ...props
}) => {
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

    const onClearMedia = useCallback(() => {
        if (onChange !== null) {
            onChange(null);
        }
    }, [value, onChange, closeForm]);

    const label = value !== null ? value.name || getFileName(value.url) || null : null;

    return (
        <FieldWithForm
            value={value}
            onChange={onChange}
            noValueLabel={noValueLabel}
            label={label}
            thumbnailPath="thumbnail_url"
            {...props}
        >
            <MediaGallery
                type={type}
                isPicker
                isSmall
                selectedMedia={value}
                onChange={onChange}
                onClickMedia={onClickMedia}
                onClearMedia={onClearMedia}
            />
        </FieldWithForm>
    );
};

MediaField.propTypes = propTypes;
MediaField.defaultProps = defaultProps;
MediaField.withForm = true;

export default MediaField;
