import { ReactNode, createContext, use, useEffect, useMemo, useState } from 'react';

import { ScreensManager } from '../lib';

import type { ScreenDefinition } from '../types';
import { ComponentsProvider, SCREENS_NAMESPACE } from './ComponentsContext';

export const ScreensContext = createContext(null);

export const useScreensManager = () => use(ScreensContext);

interface ScreensProviderProps {
    screens?: ScreenDefinition[] | null;
    namespaces?: string[] | null;
    filterNamespaces?: boolean;
    manager?: ScreensManager | null;
    children: ReactNode;
}

export function ScreensProvider({
    screens = null,
    namespaces = null,
    filterNamespaces = false,
    manager = null,
    children,
}: ScreensProviderProps) {
    const previousManager = useScreensManager();
    const [finalManager] = useState(() => {
        let newManager = manager !== null ? manager : new ScreensManager(screens);
        if ((previousManager || null) !== null) {
            newManager = previousManager.merge(newManager);
        }
        if (filterNamespaces) {
            newManager = newManager.filter(
                ({ namespaces: screenGroups = null }) =>
                    screenGroups === null ||
                    (namespaces !== null &&
                        screenGroups.reduce(
                            (acc, id) => acc || namespaces.indexOf(id) !== -1,
                            false,
                        )),
            );
        }
        return newManager;
    });

    const [components, setComponents] = useState(() => finalManager.getComponents());
    useEffect(() => {
        const onChange = () => setComponents(finalManager.getComponents());
        finalManager.on('change', onChange);
        return () => {
            finalManager.off('change', onChange);
        };
    }, [finalManager, setComponents]);

    return (
        <ScreensContext value={finalManager}>
            <ComponentsProvider namespace={SCREENS_NAMESPACE} components={components}>
                {children}
            </ComponentsProvider>
        </ScreensContext>
    );
}
