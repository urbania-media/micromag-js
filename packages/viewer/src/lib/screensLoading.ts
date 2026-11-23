/**
 * Screens loaded on demand (`@micromag/screens/lazy`): which screen types to load, and in which
 * order. With the screens of `@micromag/screens` (all loaded), everything here is a no-op.
 */
interface ScreensLoader {
    screensLoaded?: (types: (string | null)[]) => boolean;
    loadScreens?: (types: (string | null)[]) => Promise<void>;
}

interface StoryScreen {
    type?: string | null;
}

const getType = (screens: StoryScreen[], index: number): string | null => {
    const { type = null } = screens[index] || {};
    return type;
};

/**
 * The screen types of a story, the screen at `index` first, then its neighbours, then the others
 * by distance (the next one before the previous one)
 */
export function getScreenTypesByDistance(screens: StoryScreen[], index: number): string[] {
    const types: string[] = [];
    const add = (i: number) => {
        const type = getType(screens, i);
        if (type !== null && types.indexOf(type) === -1) {
            types.push(type);
        }
    };
    add(index);
    for (let distance = 1; distance < screens.length; distance += 1) {
        add(index + distance);
        add(index - distance);
    }
    return types;
}

/**
 * The screen types to have loaded before showing the screen at `index`: itself and its
 * neighbours, so that the next screen is always there during the transition after it
 */
export function getScreenWindowTypes(screens: StoryScreen[], index: number): string[] {
    return [index, index + 1, index - 1]
        .map((i) => getType(screens, i))
        .filter((type, i, all) => type !== null && all.indexOf(type) === i);
}

/**
 * True when the screen at `index` and its neighbours are loaded (always with screens that aren't
 * lazy)
 */
export function screensWindowLoaded(
    screensManager: ScreensLoader | null,
    screens: StoryScreen[],
    index: number,
): boolean {
    return (
        screensManager === null ||
        typeof screensManager.screensLoaded !== 'function' ||
        screensManager.screensLoaded(getScreenWindowTypes(screens, index))
    );
}

/**
 * Null when the screen at `index` and its neighbours are loaded (always the case with screens
 * that aren't lazy), or a promise that resolves once they are
 */
export function waitForScreens(
    screensManager: ScreensLoader | null,
    screens: StoryScreen[],
    index: number,
): Promise<void> | null {
    if (
        screensManager === null ||
        typeof screensManager.screensLoaded !== 'function' ||
        typeof screensManager.loadScreens !== 'function'
    ) {
        return null;
    }
    const types = getScreenWindowTypes(screens, index);
    return screensManager.screensLoaded(types) ? null : screensManager.loadScreens(types);
}

/**
 * Starts loading the screen types of the story, the screen at `index` and its neighbours first
 */
export function preloadScreens(
    screensManager: ScreensLoader | null,
    screens: StoryScreen[],
    index: number,
): void {
    if (screensManager !== null && typeof screensManager.loadScreens === 'function') {
        screensManager.loadScreens(getScreenTypesByDistance(screens, index)).catch(() => {
            // A screen that can't be loaded shows its error when it is rendered
        });
    }
}
