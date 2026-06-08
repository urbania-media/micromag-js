import isString from 'lodash-es/isString';
import React, { ElementType, createContext, use } from 'react';

import { ComponentsManager } from '../lib';

export const MODALS_NAMESPACE = 'modals';
export const FIELDS_NAMESPACE = 'fields';
export const FORMS_NAMESPACE = 'forms';
export const SCREENS_NAMESPACE = 'screens';
export const ELEMENTS_NAMESPACE = 'elements';

export const ComponentsContext = createContext<ComponentsManager | null>(null);

const emptyComponents = {};

/**
 * Hooks
 */
export const useComponentsManager = (namespace: string | null = null): ComponentsManager | null => {
    const manager = use(ComponentsContext);
    return namespace !== null ? new ComponentsManager(manager?.getComponents(namespace)) : manager;
};

export const useComponents = (
    namespace: string | null = null,
    defaultComponents = emptyComponents,
): Record<string, ElementType> => {
    const manager = useComponentsManager();
    return manager?.getComponents(namespace) || defaultComponents;
};

export const useComponent = (
    name: string | ElementType | null,
    defaultComponent: ElementType | null = null,
    namespace: string | null = null,
): ElementType | null => {
    const manager = useComponentsManager(namespace);
    if (!isString(name)) {
        return name || defaultComponent;
    }
    return manager?.getComponent(name) || defaultComponent;
};

/**
 * Fields hooks
 */
export const useFieldsComponentsManager = () => useComponentsManager(FIELDS_NAMESPACE);

export const useFieldsComponents = (defaultComponents = emptyComponents) =>
    useComponents(FIELDS_NAMESPACE, defaultComponents);

export const useFieldComponent = (name: string | ElementType | null, defaultComponent = null) =>
    useComponent(name, defaultComponent, FIELDS_NAMESPACE);

/**
 * Screens hooks
 */
export const useScreensComponentsManager = () => useComponentsManager(SCREENS_NAMESPACE);

export const useScreensComponents = (defaultComponents = emptyComponents) =>
    useComponents(SCREENS_NAMESPACE, defaultComponents);

export const useScreenComponent = (name: string | ElementType | null, defaultComponent = null) =>
    useComponent(name, defaultComponent, SCREENS_NAMESPACE);

/**
 * Forms hooks
 */
export const useFormsComponentsManager = () => useComponentsManager(FORMS_NAMESPACE);

export const useFormsComponents = (defaultComponents = emptyComponents) =>
    useComponents(FORMS_NAMESPACE, defaultComponents);

export const useFormComponent = (name: string | ElementType | null, defaultComponent = null) =>
    useComponent(name, defaultComponent, FORMS_NAMESPACE);

/**
 * Modals hooks
 */
export const useModalsComponentsManager = () => useComponentsManager(MODALS_NAMESPACE);

export const useModalsComponents = (defaultComponents = emptyComponents) =>
    useComponents(MODALS_NAMESPACE, defaultComponents);

export const useModalComponent = (name: string | ElementType | null, defaultComponent = null) =>
    useComponent(name, defaultComponent, MODALS_NAMESPACE);

/**
 * Elements hooks
 */
export const useElementsComponentsManager = () => useComponentsManager(ELEMENTS_NAMESPACE);

export const useElementsComponents = (defaultComponents = emptyComponents) =>
    useComponents(ELEMENTS_NAMESPACE, defaultComponents);

export const useElementComponent = (name: string | ElementType | null, defaultComponent = null) =>
    useComponent(name, defaultComponent, ELEMENTS_NAMESPACE);

/**
 * Provider
 */
interface ComponentsProviderProps {
    children: React.ReactNode;
    namespace?: string | null;
    manager?: ComponentsManager | null;
    components?: Record<string, Record<string, ElementType>> | Record<string, ElementType>;
}

export function ComponentsProvider({
    components = emptyComponents,
    manager = null,
    namespace = null,
    children,
}: ComponentsProviderProps) {
    const previousManager = useComponentsManager() || null;
    const finalManager = new ComponentsManager({
        ...(previousManager !== null ? previousManager.getComponents() : null),
        ...(manager !== null ? manager.getComponents() : null),
        ...new ComponentsManager(components).addNamespace(namespace).getComponents(),
    });
    return <ComponentsContext value={finalManager}>{children}</ComponentsContext>;
}
