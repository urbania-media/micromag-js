import EventEmitter from 'wolfy87-eventemitter';
import isArray from 'lodash/isArray';

class ScreensManager extends EventEmitter {
    constructor(screens = []) {
        super();

        this.screens =
            screens !== null
                ? screens.reduce(
                      (screensMap, screen) => ({
                          ...screensMap,
                          [screen.id]: screen,
                      }),
                      {},
                  )
                : null;
    }

    addScreen(screen) {
        this.addScreens(isArray(screen) ? screen : [screen]);
        return this;
    }

    addScreens(screens) {
        this.screens = screens.reduce(
            (screensMap, screen) => ({
                ...screensMap,
                [screen.id]: screen,
            }),
            this.screens,
        );

        this.emit('change');

        return this;
    }

    merge(manager) {
        return this.addScreens(manager.getScreens());
    }

    getScreen(id) {
        return this.screens[id] || null;
    }

    getScreens() {
        return Object.keys(this.screens).map((id) => this.screens[id]);
    }

    hasScreen(id) {
        return typeof this.screens[id] !== 'undefined';
    }

    getComponents() {
        return Object.keys(this.screens).reduce(
            (allComponents, id) => ({
                ...allComponents,
                [id]: this.screens[id].component,
            }),
            {},
        );
    }
}

export default ScreensManager;
