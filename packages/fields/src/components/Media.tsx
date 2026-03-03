/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback } from 'react';

import MediaModal from './MediaModal';

interface MediaFieldProps {
    onChange?: (...args: unknown[]) => void;
    closeForm?: (...args: unknown[]) => void;
}

const MediaField = ({ closeForm = null, onChange = null, ...props }) => {
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

MediaField.withForm = true;

export default MediaField;
