/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import FieldsProvider from '../../packages/fields/src/FieldsProvider';
import Fields from '../../packages/fields/src/components/Fields';

interface ScreenFieldsProps {
    definition: { fields: unknown[]; [key: string]: unknown };
    [key: string]: unknown;
}

function ScreenFields({ definition: { fields }, ...props }: ScreenFieldsProps) {
    return (
        <FieldsProvider>
            <Fields fields={fields} {...props} />
        </FieldsProvider>
    );
}

export default ScreenFields;
