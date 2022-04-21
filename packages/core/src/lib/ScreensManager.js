import DefinitionsManager from './DefinitionsManager';

class ScreensManager extends DefinitionsManager {
    getFields(id) {
        const { fields = null } = this.getDefinition(id) || {};
        return fields;
    }

    getLayouts(id) {
        const { layouts = null } = this.getDefinition(id) || {};
        return layouts;
    }

    filter(filter) {
        // return new ScreensManager(this.definitions.filter(filter));
        this.definitions = this.definitions.filter(filter);
        return this;
    }
}

export default ScreensManager;
