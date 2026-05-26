import React, { useCallback } from 'react';

import MediaModal, { MediaModalProps } from './MediaModal';

export interface MediaFieldProps extends MediaModalProps {
    onChange?: ((...args: unknown[]) => void) | null;
    closeForm?: ((...args: unknown[]) => void) | null;
}

function MediaField({ closeForm = null, onChange = null, ...props }: MediaFieldProps) {
    const closeOnChange = useCallback(
        (newValue) => {
            if (onChange !== null) {
                onChange(newValue);
            }
            if (closeForm !== null) {
                closeForm();
            }
        },
        [onChange, closeForm],
    );

    return <MediaModal onChange={closeOnChange} {...props} />;
}

MediaField.withForm = true;

export default MediaField;
