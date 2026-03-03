/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';

import InputGroup from './InputGroup';
import Number from './Number';

interface SpacingProps {
    value?: number | null;
    className?: string | null;
    onChange?: ((...args: unknown[]) => void) | null;
}

function Spacing({ value = null, className = null, onChange = null, ...props }: SpacingProps) {
    return (
        <InputGroup className={className} append="px">
            <Number value={value} min={0} max={20} onChange={onChange} {...props} />
        </InputGroup>
    );
}

export default Spacing;
