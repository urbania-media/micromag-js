import DefinitionsManager from './DefinitionsManager';

class FieldsManager extends DefinitionsManager {
    filter(filter) {
        return new FieldsManager(this.definitions.filter(filter));
        // this.definitions = this.definitions.filter(filter);
        // return this;
    }
}

export default FieldsManager;
