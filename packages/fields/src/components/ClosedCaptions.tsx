import { FormattedMessage } from 'react-intl';

import type { ClosedCaptionsMedia } from '@micromag/core';

import MediaField, { MediaFieldProps } from './Media';

interface ClosedCaptionFieldProps extends MediaFieldProps {
    value?: ClosedCaptionsMedia | null;
}

function ClosedCaptionField({ value: value = null, ...props }: ClosedCaptionFieldProps) {
    return (
        <MediaField
            noValueLabel={
                <FormattedMessage
                    defaultMessage="Select a closed captions file..."
                    description="Label when no value is provided to Closed captions field"
                />
            }
            {...props}
            value={value}
            type="subtitle"
        />
    );
}

ClosedCaptionField.withForm = true;

export default ClosedCaptionField;
