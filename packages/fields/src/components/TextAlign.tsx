/* eslint-disable react/no-array-index-key, react/button-has-type, react/jsx-props-no-spreading */
import { faAlignCenter } from '@fortawesome/free-solid-svg-icons/faAlignCenter';
import { faAlignLeft } from '@fortawesome/free-solid-svg-icons/faAlignLeft';
import { faAlignRight } from '@fortawesome/free-solid-svg-icons/faAlignRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import Radios from './Radios';

interface TextAlignProps {
    value?: string | null;
    options?: Record<string, unknown>[];
    onChange?: ((...args: unknown[]) => void) | null;
}

function TextAlign({
    value = null,

    options = [
        { value: 'left', label: <FontAwesomeIcon icon={faAlignLeft} /> },
        { value: 'center', label: <FontAwesomeIcon icon={faAlignCenter} /> },
        { value: 'right', label: <FontAwesomeIcon icon={faAlignRight} /> },
    ],

    onChange = null,
    ...props
}: TextAlignProps) {
    return <Radios value={value} options={options} onChange={onChange} uncheckable {...props} />;
}

export default TextAlign;
