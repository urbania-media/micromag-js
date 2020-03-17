import { pascalCase } from 'change-case';

const getComponentFromName = (name, components, defaultComponent = null) => {
    const componentName = pascalCase(name || '');
    return components[componentName] || components[name] || defaultComponent;
};

export default getComponentFromName;
