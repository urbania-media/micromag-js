/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';

import InputGroup from './InputGroup';
import Number from './Number';

interface SpacingProps {
    value?: number;
    className?: string;
    onChange?: (...args: unknown[]) => void;
}

function Spacing({ value = null, className = null, onChange = null, ...props }: SpacingProps) {
    return (
        <InputGroup className={className} append="px">
            <Number value={value} min={0} max={20} onChange={onChange} {...props} />
        </InputGroup>
    );
}

export default Spacing;
