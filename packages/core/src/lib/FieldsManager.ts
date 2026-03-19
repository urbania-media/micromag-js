import { FieldDefinition } from '../types';
import DefinitionsManager from './DefinitionsManager';

class FieldsManager extends DefinitionsManager<FieldDefinition> {
    filter(filter: (definition: FieldDefinition) => boolean): FieldsManager {
        return new FieldsManager(this.definitions.filter(filter));
    }
}

export default FieldsManager;
