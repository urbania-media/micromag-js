/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import MediaModal from './MediaModal';

const propTypes = {
    onChange: PropTypes.func,
    closeForm: PropTypes.func,
};

const defaultProps = {
    onChange: null,
    closeForm: null,
};

const MediaField = ({ closeForm, onChange, ...props }) => {
    const closeOnChange = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange(newValue);
            }
            if (closeForm !== null) {
                // console.log('close');
                closeForm();
            }
        },
        [onChange, closeForm],
    );

    return <MediaModal onChange={closeOnChange} {...props} />;
};

MediaField.propTypes = propTypes;
MediaField.defaultProps = defaultProps;
MediaField.withForm = true;

export default MediaField;
