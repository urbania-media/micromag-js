import { ScreenDefinition } from '../types';
import DefinitionsManager from './DefinitionsManager';

type ScreensFieldsPattern = {
    fonts?: Record<string, RegExp[]>;
    medias?: Record<string, RegExp[]>;
};

class ScreensManager extends DefinitionsManager<ScreenDefinition> {
    fieldsPattern: ScreensFieldsPattern | null;
    constructor(definitions = []) {
        super(definitions);
        this.fieldsPattern = null;
    }

    getFields(id: string) {
        const { fields = null } = this.getDefinition(id) || {};
        return fields;
    }

    getLayouts(id: string) {
        const { layouts = null } = this.getDefinition(id) || {};
        return layouts;
    }

    getFieldsPattern() {
        return this.fieldsPattern;
    }

    setFieldsPattern(fieldsPattern: ScreensFieldsPattern) {
        this.fieldsPattern = fieldsPattern;
    }

    filter(filter: (definition: ScreenDefinition) => boolean): ScreensManager {
        return new ScreensManager(this.definitions.filter(filter));
        // this.definitions = this.definitions.filter(filter);
        // return this;
    }

    merge(manager: ScreensManager) {
        const newFieldsPattern = manager.getFieldsPattern();
        if (newFieldsPattern !== null && this.fieldsPattern === null) {
            this.fieldsPattern = newFieldsPattern;
        }
        return this.addDefinitions(manager.getDefinitions());
    }
}

export default ScreensManager;
