import { ScreenDefinition } from '../types';
import DefinitionsManager from './DefinitionsManager';

type ScreensFieldsPattern = {
    fonts?: Record<string, RegExp[]>;
    medias?: Record<string, RegExp[]>;
    /** What ThemeParser reads of each definition, for the screens without fields (lazy) */
    theme?: Record<string, unknown>;
};

const unique = (types: (string | null)[]): string[] =>
    types.filter((type, index) => type !== null && types.indexOf(type) === index);

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

    /**
     * True when the components of these screen types are loaded. The screens of a definition with
     * a component are always loaded; only the lazy ones (with `load`) can be waiting.
     */
    screensLoaded(types: (string | null)[]): boolean {
        return unique(types).every((type) => {
            const { isLoaded = null } = this.getDefinition(type) || {};
            return isLoaded === null || isLoaded();
        });
    }

    /**
     * True when these screen types are loaded or failed to load: nothing to wait for. A screen
     * that failed shows its error (and can be loaded again with `loadScreens`).
     */
    screensSettled(types: (string | null)[]): boolean {
        return unique(types).every((type) => {
            const { isLoaded = null, hasFailed = null } = this.getDefinition(type) || {};
            return isLoaded === null || isLoaded() || (hasFailed !== null && hasFailed());
        });
    }

    /**
     * The screen types, among these, whose last attempt to load failed
     */
    screensFailed(types: (string | null)[]): string[] {
        return unique(types).filter((type) => {
            const { hasFailed = null } = this.getDefinition(type) || {};
            return hasFailed !== null && hasFailed();
        });
    }

    /**
     * Loads the components of these screen types, in this order (again for those that failed),
     * and resolves once they are all loaded (at once for the screens that aren't lazy). Rejects if
     * one of them fails.
     */
    loadScreens(types: (string | null)[]): Promise<void> {
        return Promise.all(
            unique(types).map((type) => {
                const { load = null, isLoaded = null } = this.getDefinition(type) || {};
                return load !== null && (isLoaded === null || !isLoaded()) ? load() : null;
            }),
        ).then(() => undefined);
    }

    /**
     * Calls the listener each time a lazy screen finishes an attempt to load (loaded or failed).
     * Returns a function that unsubscribes.
     */
    onScreensSettled(listener: () => void): () => void {
        const unsubscribes = this.definitions
            .map(({ onSettled = null }) => (onSettled !== null ? onSettled(listener) : null))
            .filter((unsubscribe) => unsubscribe !== null);
        return () => unsubscribes.forEach((unsubscribe) => unsubscribe());
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
