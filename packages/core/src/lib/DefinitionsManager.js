import EventEmitter from 'wolfy87-eventemitter';
import isArray from 'lodash/isArray';

class DefinitionsManager extends EventEmitter {
    constructor(definitions = []) {
        super();

        this.definitions =
            definitions !== null
                ? definitions.reduce(
                      (definitionsMap, definition) => ({
                          ...definitionsMap,
                          [definition.id]: definition,
                      }),
                      {},
                  )
                : null;
    }

    addDefinition(definition) {
        this.addDefinitions(isArray(definition) ? definition : [definition]);
        return this;
    }

    addDefinitions(definitions) {
        this.definitions = definitions.reduce(
            (definitionsMap, definition) => ({
                ...definitionsMap,
                [definition.id]: definition,
            }),
            this.definitions,
        );

        this.emit('change');

        return this;
    }

    merge(manager) {
        return this.addDefinitions(manager.getDefinitions());
    }

    getDefinition(id) {
        return this.definitions[id] || null;
    }

    getDefinitions() {
        return Object.keys(this.definitions).map((id) => this.definitions[id]);
    }

    hasDefinition(id) {
        return typeof this.definitions[id] !== 'undefined';
    }

    getComponent(id) {
        const { component = null } = this.getDefinition(id) || {};
        return component;
    }

    getComponents() {
        return Object.keys(this.definitions).reduce(
            (allComponents, id) => ({
                ...allComponents,
                [id]: this.definitions[id].component,
            }),
            {},
        );
    }
}

export default DefinitionsManager;
