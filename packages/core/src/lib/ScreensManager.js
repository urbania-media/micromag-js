import DefinitionsManager from './DefinitionsManager';

class ScreensManager extends DefinitionsManager {
    constructor(definitions = []) {
        super(definitions);
        this.fieldsPattern = null;
    }

    getFields(id) {
        const { fields = null } = this.getDefinition(id) || {};
        return fields;
    }

    getLayouts(id) {
        const { layouts = null } = this.getDefinition(id) || {};
        return layouts;
    }

    getFieldsPattern() {
        return this.fieldsPattern;
    }

    setFieldsPattern(fieldsPattern) {
        this.fieldsPattern = fieldsPattern;
    }

    filter(filter) {
        return new ScreensManager(this.definitions.filter(filter));
        // this.definitions = this.definitions.filter(filter);
        // return this;
    }

    merge(manager) {
        const newFieldsPattern = manager.getFieldsPattern();
        if (newFieldsPattern !== null && this.fieldsPattern === null) {
            this.fieldsPattern = newFieldsPattern;
        }
        return this.addDefinitions(manager.getDefinitions());
    }
}

export default ScreensManager;
