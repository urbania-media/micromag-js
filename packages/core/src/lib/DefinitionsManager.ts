import isArray from 'lodash/isArray';
import uniqBy from 'lodash/uniqBy';
import EventEmitter from 'wolfy87-eventemitter';

import { Component, Definition } from '../types';

class DefinitionsManager<T extends Definition = Definition> extends EventEmitter {
    definitions: T[];

    constructor(definitions: T[] = []) {
        super();
        this.definitions = definitions || [];
    }

    addDefinition(definition: T | T[]) {
        this.addDefinitions(isArray(definition) ? definition : [definition]);
        return this;
    }

    addDefinitions(definitions: T[]) {
        this.definitions = uniqBy([...definitions, ...this.definitions], (it) => it.id);
        this.emit('change');

        return this;
    }

    merge(manager: DefinitionsManager<T>) {
        return this.addDefinitions(manager.getDefinitions());
    }

    filter(filter: (definition: T) => boolean): DefinitionsManager<T> {
        // this.definitions = this.definitions.filter(filter);
        // return this;
        return new DefinitionsManager<T>(this.definitions.filter(filter));
    }

    getDefinition(id: string) {
        if (id === null) {
            return null;
        }
        return this.definitions.find((it) => it.id === id) || null;
    }

    getDefinitions(): T[] {
        return this.definitions;
    }

    hasDefinition(id: string) {
        return this.getDefinition(id) !== null;
    }

    getComponent(id: string) {
        const { component = null } = this.getDefinition(id) || {};
        return component;
    }

    getComponents(): Record<string, Component> {
        return this.definitions.reduce(
            (allComponents, { id, component = null }) =>
                component !== null
                    ? {
                          ...allComponents,
                          [id]: component,
                      }
                    : allComponents,
            {},
        );
    }
}

export default DefinitionsManager;
