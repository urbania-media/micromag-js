/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';

import Select from './Select';

interface TargetFieldProps {
    options?: string[];
    isForm?: boolean;
    value?: string;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function TargetField({
    options = ['_blank', 'self'],
    value = null,
    isForm = false,
    className = null,
    onChange = null,
}) {
    return isForm ? (
        <div>
            <Select options={options} value={value} className={className} onChange={onChange} />
        </div>
    ) : (
        <div>{value}</div>
    );
}

TargetField.withForm = true;

export default TargetField;
