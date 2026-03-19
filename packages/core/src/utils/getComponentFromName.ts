import { ComponentType } from 'react';

import { ComponentsMap } from '../types';
import pascalCase from './pascalCase';

const getComponentFromName = (
    name: string | null = null,
    components: ComponentsMap,
    defaultComponent: ComponentType | null = null,
): ComponentType | null => {
    if (components === null || name === null) {
        return defaultComponent;
    }
    const pascalName = pascalCase(name);
    return components[pascalName] || components[name] || defaultComponent;
};

export default getComponentFromName;
