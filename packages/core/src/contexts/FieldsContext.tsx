import isString from 'lodash-es/isString';
import uniqBy from 'lodash-es/uniqBy';
import { ReactNode, createContext, use } from 'react';

import { FieldsManager } from '../lib';

import { FieldDefinition } from '../types';
import { ComponentsProvider, FIELDS_NAMESPACE } from './ComponentsContext';

export const FieldsContext = createContext<FieldsManager | null>(null);

export const useFieldsManager = () => use(FieldsContext);

export const useFieldDefinition = (id: string) => {
    const manager = useFieldsManager();
    return manager?.getDefinition(id);
};

interface FieldsProviderProps {
    fields?: FieldDefinition[] | null;
    manager?: FieldsManager | null;
    children: ReactNode;
}

export function FieldsProvider({ fields = null, manager = null, children }: FieldsProviderProps) {
    const previousManager = useFieldsManager() || null;

    const newFields = uniqBy(
        [
            ...(fields || []),
            ...(manager !== null ? manager.getDefinitions() : []),
            ...(previousManager !== null ? previousManager.getDefinitions() : []),
        ],
        ({ id }) => id,
    ).reverse();
    const finalManager = new FieldsManager(newFields);
    const newComponents = finalManager.getComponents();
    const components = Object.keys(newComponents).reduce((map, id) => {
        const component = newComponents[id];
        return isString(component)
            ? map
            : {
                  ...map,
                  [id]: component,
              };
    }, {});

    return (
        <FieldsContext value={finalManager}>
            <ComponentsProvider namespace={FIELDS_NAMESPACE} components={components}>
                {children}
            </ComponentsProvider>
        </FieldsContext>
    );
}
