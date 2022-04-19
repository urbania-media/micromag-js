import DefinitionsManager from './DefinitionsManager';

class FieldsManager extends DefinitionsManager {
    filter(filter) {
        return new FieldsManager(this.definitions.filter(filter));
    }
}

export default FieldsManager;
