/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React, { useCallback } from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import TextTransform from './TextTransform';

interface FontStyleTransformProps {
    value?: Record<string, unknown>;
    transformName?: string;
    onChange?: (...args: unknown[]) => void;
}

function FontStyleTransform({
    value = null,
    transformName = 'transform',
    onChange = null,
    ...props
}) {
    const transformValue = value !== null ? value[transformName] || null : null;
    const onTransformChange = useCallback(
        (newTransformValue) => {
            const newValue = {
                ...value,
                [transformName]: newTransformValue,
            };
            if (onChange !== null) {
                onChange(newValue);
            }
        },
        [value, transformName, onChange],
    );
    return <TextTransform value={transformValue} onChange={onTransformChange} {...props} />;
}

FontStyleTransform.isHorizontal = true;

export default FontStyleTransform;
