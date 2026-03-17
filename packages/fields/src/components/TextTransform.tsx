/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import React from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import Radios from './Radios';

interface TextTransformProps {
    value?: Record<string, unknown> | null;
    options?: Record<string, unknown>[];
    onChange?: ((...args: unknown[]) => void) | null;
}

const defaultOptions = [
    { value: 'capitalize', label: <strong>Aa</strong> },
    { value: 'uppercase', label: <strong>AA</strong> },
    { value: 'lowercase', label: <strong>aa</strong> },
];

function TextTransform({
    value = null,
    options = defaultOptions,
    onChange = null,
    ...props
}: TextTransformProps) {
    return <Radios value={value} options={options} onChange={onChange} uncheckable {...props} />;
}

TextTransform.isHorizontal = true;

export default TextTransform;
