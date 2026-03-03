/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { pascalCase } from '../../utils';

import PlaceholderBlock from './PlaceholderBlock';

interface ElementComponentProps {
    name: string;
    components: Record<string, unknown>;
    props?: Record<string, unknown>;
    isPlaceholder?: boolean;
    className?: string | null;
    placeholderProps?: Record<string, unknown> | null;
}

function ElementComponent({
    name,
    components,
    props = {},
    isPlaceholder = false,
    className = null,
    placeholderProps = null,
}: ElementComponentProps) {
    if (!name) {
        return 'Bad component name';
    }

    if (isPlaceholder) {
        // TODO: figure out what this did
        // const PlaceholderComponent = Placeholders[pascalCase(name)];
        return <PlaceholderBlock {...placeholderProps} />;
    }

    const RealComponent = components[pascalCase(name)];

    if (!RealComponent) {
        return 'Bad component';
    }

    return <RealComponent {...props} className={className} />;
}

export default ElementComponent;
