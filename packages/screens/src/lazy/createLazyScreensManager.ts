import type { ElementType } from 'react';

import { ScreensManager } from '@micromag/core';

import createLazyScreen from './createLazyScreen';

type FieldsPattern = Parameters<ScreensManager['setFieldsPattern']>[0];

/**
 * A screens manager whose screens are loaded on demand: no fields or labels, only the components
 * (with their CSS) and the patterns that the story parser needs, precomputed at build time
 */
export default function createLazyScreensManager(
    loaders: Record<string, () => Promise<ElementType>>,
    fieldsPattern: FieldsPattern | null = null,
): ScreensManager {
    const manager = new ScreensManager(
        Object.keys(loaders).map((id) => createLazyScreen(id, loaders[id])),
    );
    if (fieldsPattern !== null) {
        manager.setFieldsPattern(fieldsPattern);
    }
    return manager;
}
