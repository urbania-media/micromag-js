/**
 * Screens loaded on demand (`@micromag/screens/lazy`): which screen types to load, in which order,
 * and when the viewer can show them or go to them. With the screens of `@micromag/screens` (all
 * loaded), everything here is a no-op.
 *
 * A screen type is "settled" when it is loaded or when its last attempt to load failed: the viewer
 * doesn't wait for a screen that failed (it shows its error) and tries to load it again when the
 * reader gets to it or next to it.
 */
interface ScreensLoader {
    screensLoaded?: (types: (string | null)[]) => boolean;
    screensSettled?: (types: (string | null)[]) => boolean;
    screensFailed?: (types: (string | null)[]) => string[];
    loadScreens?: (types: (string | null)[]) => Promise<void>;
}

interface StoryScreen {
    type?: string | null;
}

const getType = (screens: StoryScreen[], index: number): string | null => {
    const { type = null } = screens[index] || {};
    return type;
};

const canLoad = (screensManager: ScreensLoader | null): screensManager is ScreensLoader =>
    screensManager !== null && typeof screensManager.loadScreens === 'function';

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
 * The screen types to have before showing the screen at `index`: itself and its neighbours, so
 * that the next screen is always there during the transition after it
 */
export function getScreenWindowTypes(screens: StoryScreen[], index: number): string[] {
    return [index, index + 1, index - 1]
        .map((i) => getType(screens, i))
        .filter((type, i, all) => type !== null && all.indexOf(type) === i);
}

/**
 * True when this screen type is loaded (always with screens that aren't lazy)
 */
export function screenLoaded(screensManager: ScreensLoader | null, type: string | null): boolean {
    return (
        screensManager === null ||
        typeof screensManager.screensLoaded !== 'function' ||
        screensManager.screensLoaded([type])
    );
}

/**
 * True when the screen at `index` and its neighbours are loaded or failed to load: the viewer can
 * show them, or go to them (always with screens that aren't lazy)
 */
export function screensWindowSettled(
    screensManager: ScreensLoader | null,
    screens: StoryScreen[],
    index: number,
): boolean {
    if (screensManager === null) {
        return true;
    }
    const types = getScreenWindowTypes(screens, index);
    if (typeof screensManager.screensSettled === 'function') {
        return screensManager.screensSettled(types);
    }
    return (
        typeof screensManager.screensLoaded !== 'function' || screensManager.screensLoaded(types)
    );
}

/**
 * Null when the screen at `index` and its neighbours are settled (always the case with screens
 * that aren't lazy), or a promise that settles once they are (it rejects if one fails)
 */
export function waitForScreens(
    screensManager: ScreensLoader | null,
    screens: StoryScreen[],
    index: number,
): Promise<void> | null {
    if (!canLoad(screensManager) || screensWindowSettled(screensManager, screens, index)) {
        return null;
    }
    return screensManager.loadScreens(getScreenWindowTypes(screens, index));
}

/**
 * Loads the screen at `index` and its neighbours again if one of them failed, once (the reader
 * got to it or next to it). Returns null when none failed.
 */
export function retryFailedScreens(
    screensManager: ScreensLoader | null,
    screens: StoryScreen[],
    index: number,
): Promise<void> | null {
    if (!canLoad(screensManager) || typeof screensManager.screensFailed !== 'function') {
        return null;
    }
    const failed = screensManager.screensFailed(getScreenWindowTypes(screens, index));
    return failed.length > 0 ? screensManager.loadScreens(failed) : null;
}

/**
 * Starts loading the screen types of the story, the screen at `index` and its neighbours first
 */
export function preloadScreens(
    screensManager: ScreensLoader | null,
    screens: StoryScreen[],
    index: number,
): void {
    if (canLoad(screensManager)) {
        screensManager.loadScreens(getScreenTypesByDistance(screens, index)).catch(() => {
            // A screen that can't be loaded shows its error when it is rendered
        });
    }
}

/**
 * The navigation the viewer holds while the target screen or its neighbours load. Only the last
 * target counts: a new tap replaces it, and a tap back to the current screen cancels it.
 */
export class PendingNavigation {
    index: number | null = null;

    /**
     * Returns true when the viewer can go to `index` now. Otherwise the navigation is held (or
     * cancelled, when `index` is the current screen) and `onSettled` is called once the screens it
     * waits for are settled.
     */
    request(
        index: number,
        currentIndex: number,
        waiting: Promise<void> | null,
        onSettled: () => void,
    ): boolean {
        if (index === currentIndex) {
            this.index = null;
            return false;
        }
        if (waiting === null) {
            this.index = null;
            return true;
        }
        this.index = index;
        waiting.then(onSettled, onSettled);
        return false;
    }

    /**
     * The held target, once `isSettled` says its screens are settled (it is then no longer held)
     */
    take(isSettled: (index: number) => boolean): number | null {
        const { index } = this;
        if (index === null || !isSettled(index)) {
            return null;
        }
        this.index = null;
        return index;
    }
}
