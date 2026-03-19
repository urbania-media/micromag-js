import { ComponentType } from 'react';
import EventEmitter from 'wolfy87-eventemitter';

import { getComponentFromName } from '../utils';

import { ComponentsMap } from '../types';

class ComponentsManager extends EventEmitter {
    components: ComponentsMap;
    constructor(components = {}) {
        super();

        this.components = components;
    }

    addComponent(name: string, component: ComponentType, namespace: string | null = null) {
        return this.addComponents(
            {
                [name]: component,
            },
            namespace,
        );
    }

    addComponents(components: ComponentsMap, namespace: string | null = null) {
        const newComponents =
            namespace !== null
                ? Object.keys(components).reduce(
                      (componentsMaps, name) => ({
                          ...componentsMaps,
                          [`${namespace}.${name}`]: components[name],
                      }),
                      {},
                  )
                : components;

        this.components = {
            ...this.components,
            ...newComponents,
        };

        this.emit('change');

        return this;
    }

    merge(manager: ComponentsManager, namespace = null) {
        return this.addComponents(manager.getComponents(), namespace);
    }

    addNamespace(namespace: string | null) {
        if (namespace === null) {
            return this;
        }
        this.components = Object.keys(this.components).reduce(
            (componentsMap, name) => ({
                ...componentsMap,
                [`${namespace}.${name}`]: this.components[name],
            }),
            {},
        );
        return this;
    }

    getComponent(name: string, namespace: string | null = null) {
        const components = this.getComponents(namespace);
        return getComponentFromName(name, components);
    }

    getComponents(namespace: string | null = null): ComponentsMap {
        return namespace !== null
            ? Object.keys(this.components || {}).reduce<ComponentsMap>((componentsMap, name) => {
                  const pattern = new RegExp(`^${namespace}\\.(.*)$`);
                  const matches = pattern.exec(name);
                  return matches !== null
                      ? {
                            ...componentsMap,
                            [matches[1]]: this.components[name],
                        }
                      : componentsMap;
              }, {})
            : this.components;
    }

    hasComponent(name: string, namespace: string | null = null) {
        return (
            this.components !== null &&
            typeof this.components[namespace !== null ? `${namespace}.${name}` : name] !==
                'undefined'
        );
    }
}

export default ComponentsManager;
